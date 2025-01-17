package com.openclassrooms.starterjwt.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.openclassrooms.starterjwt.security.jwt.AuthTokenFilter;
import com.openclassrooms.starterjwt.security.jwt.JwtUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import com.openclassrooms.starterjwt.security.services.UserDetailsServiceImpl;

@ExtendWith(MockitoExtension.class)
public class AuthTokenFilterTest {

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserDetailsServiceImpl userDetailsService;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filter;

    @InjectMocks
    AuthTokenFilter authTokenFilter;

    @AfterEach
    public void unAuthenticate() {
        SecurityContextHolder.clearContext();
    }

    @Test
    public void testAuthenticateByEmail() throws ServletException, IOException {
        String token = "jwt";
        String email = "random@gmail.com";
        UserDetails userDetails = new UserDetailsImpl(1L,email,"random", "gmail", false, "password");
        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(jwtUtils.validateJwtToken(token)).thenReturn(true);
        when(jwtUtils.getUserNameFromJwtToken(token)).thenReturn(email);
        when(userDetailsService.loadUserByUsername(email)).thenReturn(userDetails);
        authTokenFilter.doFilter(request, response, filter);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        verify(filter).doFilter(request, response);
        verify(userDetailsService).loadUserByUsername(email);
        assertThat(auth.getName()).isEqualTo(email);
    }

    @Test
    public void testAuthenticateFail() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn("");
        authTokenFilter.doFilter(request, response, filter);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        verify(filter).doFilter(request, response);
        assertThat(auth).isNull();
    }

    @Test
    public void testAuthenticateWithBadTokenFail() throws ServletException, IOException {
        String token = "jwt";
        when(request.getHeader("Authorization")).thenReturn(token);
        authTokenFilter.doFilter(request, response, filter);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        verify(filter).doFilter(request, response);
        assertThat(auth).isNull();
    }

    @Test
    @ExtendWith(OutputCaptureExtension.class)
    public void testAuthenticateWithUnknowEmailFail(CapturedOutput capture) throws ServletException, IOException {
        String token = "jwt";
        String email = "unknow@gmail.com";
        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(jwtUtils.validateJwtToken(token)).thenReturn(true);
        when(jwtUtils.getUserNameFromJwtToken(token)).thenReturn(email);
        when(userDetailsService.loadUserByUsername(email)).thenThrow(new UsernameNotFoundException("Unknown email"));
        authTokenFilter.doFilter(request, response, filter);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        verify(filter).doFilter(request, response);
        assertThat(auth).isNull();
        assertThat(capture.getOut()).contains("Cannot set user authentication: ");
    }
    
}