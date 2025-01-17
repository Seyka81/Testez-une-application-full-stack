package com.openclassrooms.starterjwt.payload;

import com.openclassrooms.starterjwt.payload.request.SignupRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.validation.*;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class SignupRequestTest {

    private Validator validator;
    private SignupRequest signupRequest;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();

        signupRequest = new SignupRequest();
        signupRequest.setEmail("random@gmail.com");
        signupRequest.setFirstName("random");
        signupRequest.setLastName("gmail");
        signupRequest.setPassword("password");
    }

    @Test
    void testValidSignupRequest() {
        Set<ConstraintViolation<SignupRequest>> violations = validator.validate(signupRequest);
        assertTrue(violations.isEmpty());
    }

    @Test
    void testInvalidEmail() {
        signupRequest.setEmail("email-invalide");
        Set<ConstraintViolation<SignupRequest>> violations = validator.validate(signupRequest);
        assertFalse(violations.isEmpty());
        assertEquals("doit être une adresse électronique syntaxiquement correcte", violations.iterator().next().getMessage());
    }

    @Test
    void testBlankFirstName() {
        signupRequest.setFirstName("");
        Set<ConstraintViolation<SignupRequest>> violations = validator.validate(signupRequest);
        assertFalse(violations.isEmpty());
        String message = violations.iterator().next().getMessage();
        assertTrue(message.equals("ne doit pas être vide") || message.equals("la taille doit être comprise entre 3 et 20"));
    }

    @Test
    void testBlankLastName() {
        signupRequest.setLastName("");
        Set<ConstraintViolation<SignupRequest>> violations = validator.validate(signupRequest);
        assertFalse(violations.isEmpty());
        String message = violations.iterator().next().getMessage();
        assertTrue(message.equals("ne doit pas être vide") || message.equals("la taille doit être comprise entre 3 et 20"));
    }

    @Test
    void testShortPassword() {
        signupRequest.setPassword("court");
        Set<ConstraintViolation<SignupRequest>> violations = validator.validate(signupRequest);
        assertFalse(violations.isEmpty());
        assertEquals("la taille doit être comprise entre 6 et 40", violations.iterator().next().getMessage());
    }

    @Test
    void testLongPassword() {
        signupRequest.setPassword("ppppaaaaaassssssswwwwwwoooooorrrrrrddddddtttttrrrrrroooooogggggglllllloooooonnnnnnnggggggg");
        Set<ConstraintViolation<SignupRequest>> violations = validator.validate(signupRequest);
        assertFalse(violations.isEmpty());
        assertEquals("la taille doit être comprise entre 6 et 40", violations.iterator().next().getMessage());
    }

    @Test
    void testEquals() {
        SignupRequest anotherSignupRequest = new SignupRequest();
        anotherSignupRequest.setEmail("random@gmail.com");
        anotherSignupRequest.setFirstName("random");
        anotherSignupRequest.setLastName("gmail");
        anotherSignupRequest.setPassword("password");

        assertEquals(signupRequest, anotherSignupRequest);
        assertEquals(signupRequest.hashCode(), anotherSignupRequest.hashCode());
    }

    @Test
    void testNotEquals() {
        SignupRequest differentSignupRequest = new SignupRequest();
        differentSignupRequest.setEmail("unknow@gmail.com");
        differentSignupRequest.setFirstName("unknow");
        differentSignupRequest.setLastName("gmail");
        differentSignupRequest.setPassword("password123");

        assertNotEquals(signupRequest, differentSignupRequest);
        assertNotEquals(signupRequest.hashCode(), differentSignupRequest.hashCode());
    }

    @Test
    void testToString() {
        String expectedString = "SignupRequest(email=random@gmail.com, firstName=random, lastName=gmail, password=password)";
        assertEquals(expectedString, signupRequest.toString());
    }
}
