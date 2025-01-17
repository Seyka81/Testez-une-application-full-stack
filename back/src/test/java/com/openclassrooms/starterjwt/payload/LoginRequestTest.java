package com.openclassrooms.starterjwt.payload;

import static org.assertj.core.api.Assertions.assertThat;

import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import org.junit.jupiter.api.Test;

public class LoginRequestTest {

    @Test
    public void testShouldInstanciate() {
        LoginRequest request = new LoginRequest();
        assertThat(request).isNotNull();
    }

    @Test
    public void testSetterGetter() {
        LoginRequest request = new LoginRequest();
        String email = "random@gmail.com";
        request.setEmail(email);
        assertThat(request.getEmail()).isEqualTo(email);

        String pass = "password";
        request.setPassword(pass);
        assertThat(request.getPassword()).isEqualTo(pass);
    }


}
