package com.openclassrooms.starterjwt.payload;

import static org.assertj.core.api.Assertions.assertThat;

import com.openclassrooms.starterjwt.payload.response.JwtResponse;
import org.junit.jupiter.api.Test;

public class JwtResponseTest {
    @Test
    void testGetSetJwt() {
        JwtResponse jwtresponse = new JwtResponse("aze",1L,"randomUserName","random","gmail",false);
        jwtresponse.setAdmin(true);
        assertThat(jwtresponse.getAdmin()).isEqualTo(true);
    }
}
