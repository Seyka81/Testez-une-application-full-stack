package com.openclassrooms.starterjwt.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.openclassrooms.starterjwt.security.jwt.JwtUtils;
import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Date;

@ExtendWith(MockitoExtension.class)
public class JwtUtilsTest {

    @InjectMocks
    private JwtUtils jwtUtils;

    private Authentication authMock;

    @BeforeEach
    public void setup() {
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", "openclassrooms");
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", 86400000);
    }

    @Test
    public void testGenerateJwtToken() {
        UserDetails useDetails = new UserDetailsImpl(1L, "random@gmail.com", "random", "gmail", false, "password");
        authMock = mock(Authentication.class);
        when(authMock.getPrincipal()).thenReturn(useDetails);
        String token = jwtUtils.generateJwtToken(authMock);
        System.out.println(token);
        assertThat(token).isNotNull();
    }

    @Test
    @ExtendWith(OutputCaptureExtension.class)
    public void testInvalidToken(CapturedOutput capture) {
        String token = "unfauxtoken";
        boolean valid = jwtUtils.validateJwtToken(token);
        assertFalse(valid);
        assertThat(capture.getOut()).contains("Invalid JWT token: ");
    }

    @Test
    @ExtendWith(OutputCaptureExtension.class)
    public void testEmptyToken(CapturedOutput capture) throws Exception {
        String token = "";
        boolean valid = jwtUtils.validateJwtToken(token);
        assertFalse(valid);
        assertThat(capture.getOut()).contains("JWT claims string is empty: ");
    }

    @Test
    public void testGetUserNameFromJwtToken() {
        String token = Jwts.builder()
                .setSubject("username")
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 86400000))
                .signWith(SignatureAlgorithm.HS512, "openclassrooms")
                .compact();

        String username = jwtUtils.getUserNameFromJwtToken(token);

        assertEquals("username", username);
    }

    @Test
    public void testValidateJwtTokenFail() {
        String token = Jwts.builder()
                .setSubject("username")
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 86400000))
                .signWith(SignatureAlgorithm.HS512, "wrongSecret")
                .compact();

        boolean isValid = jwtUtils.validateJwtToken(token);

        assertFalse(isValid);
    }

    @Test
    public void testValidateJwtTokenExpired() {
        String token = Jwts.builder()
                .setSubject("username")
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() - 1000))
                .signWith(SignatureAlgorithm.HS512, "wrongSecret")
                .compact();

        boolean isValid = jwtUtils.validateJwtToken(token);

        assertFalse(isValid);
    }

}
