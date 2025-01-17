package com.openclassrooms.starterjwt.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import com.openclassrooms.starterjwt.security.services.UserDetailsServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserDetailsServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    @Test
    public void testloadUser() {
        LocalDateTime now = LocalDateTime.now();
        String email = "random@gmail.com";
        User user = new User(1L, email, "gmail", "random", "password", false, now, now);
        UserDetails userExpected = new UserDetailsImpl(1L, "random@gmail.com", "random", "gmail", false, "password");
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        assertEquals(userExpected, userDetails);
    }

    @Test
    public void testloadUserNotRegister() {
        String email = "unknow@gmail.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class, () -> userDetailsService.loadUserByUsername(email));
    }

}
