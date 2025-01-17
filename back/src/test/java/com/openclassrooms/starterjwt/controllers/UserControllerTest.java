package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import com.openclassrooms.starterjwt.payload.request.SignupRequest;
import com.openclassrooms.starterjwt.payload.response.JwtResponse;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.security.jwt.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private User random;
    private String randomJwtToken;

    @BeforeEach
    void setUp() {
        Optional<User> RandomUserOptional = userRepository.findByEmail("random@gmail.com");

        if (RandomUserOptional.isPresent()) {
            random = RandomUserOptional.get();
        } else {
            random = User.builder()
                    .email("random@gmail.com")
                    .firstName("random")
                    .lastName("gmail")
                    .password("$2a$10$ROG9srmA/CtL4P7AtkU.w.GWreUm.JWzWO0wxC9ll.QSN8YyBAHCy")
                    .admin(false)
                    .build();
            random = userRepository.save(random);
        }
        Authentication randomAuth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(random.getEmail(), "password"));
        randomJwtToken = jwtUtils.generateJwtToken(randomAuth);
    }

    @Test
    void testFindById() throws Exception{
        MvcResult result = mockMvc.perform(get("/api/user/" + random.getId())
                        .header("Authorization", "Bearer " + randomJwtToken))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        User responseUser = objectMapper.readValue(responseBody, User.class);

        assertEquals(random.getId(), responseUser.getId());
        assertEquals(random.getEmail(), responseUser.getEmail());
        assertEquals(random.getFirstName(), responseUser.getFirstName());
        assertEquals(random.getLastName(), responseUser.getLastName());
        assertEquals(random.isAdmin(), responseUser.isAdmin());
    }

    @Test
    void testFindByIdFail() throws Exception{
        MvcResult result = mockMvc.perform(get("/api/user/2132432")
                        .header("Authorization", "Bearer " + randomJwtToken))
                .andExpect(status().isNotFound())
                .andReturn();

    }
    @Test
    void testDelete() throws Exception {
        mockMvc.perform(delete("/api/user/" + random.getId())
                        .header("Authorization", "Bearer " + randomJwtToken))
                .andExpect(status().isOk());
    }
}