package com.openclassrooms.starterjwt.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImplTest {

    @Test
    public void UserDetails_shouldInstantiate() {
        UserDetails userDetails = new UserDetailsImpl(1L, "bob@test.com", "Bob", "Le Bricoleur", true, "pass4321");
        assertInstanceOf(UserDetailsImpl.class, userDetails);
    }

    @Nested
    class UserDetailsMethodsTest {

        private UserDetails userDetails;

        @BeforeEach
        void setup() {

            userDetails = new UserDetailsImpl(1L, "random@gmail.com", "random", "gmail", false, "password");
        }


        @Test
        void testAccountNonExpired() {

            assertTrue(userDetails.isAccountNonExpired());
        }

        @Test
        void testAccountNonLocked() {

            assertTrue(userDetails.isAccountNonLocked());
        }

        @Test
        void testAccountCredentialNonExpired() {

            assertTrue(userDetails.isCredentialsNonExpired());
        }

        @Test
        void testAccountEnabled() {

            assertTrue(userDetails.isEnabled());
        }

    }

}
