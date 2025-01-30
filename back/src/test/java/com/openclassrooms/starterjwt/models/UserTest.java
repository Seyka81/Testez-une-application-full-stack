package com.openclassrooms.starterjwt.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;
    private User user2;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("random@gmail.com");
        user.setLastName("gmail");
        user.setFirstName("random");
        user.setPassword("password");
        user.setAdmin(false);
        user.setCreatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
        user.setUpdatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));

        user2 = new User();
        user2.setId(2L);
        user2.setEmail("random2@gmail.com");
        user2.setLastName("gmail");
        user2.setFirstName("random");
        user2.setPassword("password");
        user2.setAdmin(false);
        user2.setCreatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
        user2.setUpdatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
    }

    @Test
    public void testToString() {
        User user = User.builder()
                .email("random@gmail.com")
                .lastName("gmail")
                .firstName("random")
                .password("password")
                .admin(false)
                .build();

        String result = user.toString();

        assertTrue(result.contains("email=random@gmail.com"));
        assertTrue(result.contains("lastName=gmail"));
        assertTrue(result.contains("firstName=random"));
        assertTrue(result.contains("password=password"));
        assertTrue(result.contains("admin=false"));
    }
    @Test
    public void testEquals_sameValues() {
        User user1 = new User()
                .setId(1L)
                .setEmail("test@example.com")
                .setLastName("Doe")
                .setFirstName("John")
                .setPassword("password123")
                .setAdmin(true);

        User user2 = new User()
                .setId(1L)
                .setEmail("test@example.com")
                .setLastName("Doe")
                .setFirstName("John")
                .setPassword("password123")
                .setAdmin(true);

        assertTrue(user1.equals(user2), "Les utilisateurs devraient être égaux.");
    }

    @Test
    public void testEquals_differentValues() {
        User user1 = new User()
                .setId(1L)
                .setEmail("test@example.com")
                .setLastName("Doe")
                .setFirstName("John")
                .setPassword("password123")
                .setAdmin(true);

        User user2 = new User()
                .setId(2L)
                .setEmail("different@example.com")
                .setLastName("Smith")
                .setFirstName("Jane")
                .setPassword("password123")
                .setAdmin(false);

        assertFalse(user1.equals(user2), "Les utilisateurs ne devraient pas être égaux.");
    }

    @Test
    public void testEquals_sameReference() {
        User user1 = new User()
                .setId(1L)
                .setEmail("test@example.com")
                .setLastName("Doe")
                .setFirstName("John")
                .setPassword("password123")
                .setAdmin(true);

        assertTrue(user1.equals(user1), "Un utilisateur devrait être égal à lui-même.");
    }

    @Test
    public void testEquals_null() {
        User user1 = new User()
                .setId(1L)
                .setEmail("test@example.com")
                .setLastName("Doe")
                .setFirstName("John")
                .setPassword("password123")
                .setAdmin(true);

        assertFalse(user1.equals(null), "Un utilisateur ne devrait pas être égal à null.");
    }

    @Test
    public void testEquals_differentClass() {
        User user1 = new User()
                .setId(1L)
                .setEmail("test@example.com")
                .setLastName("Doe")
                .setFirstName("John")
                .setPassword("password123")
                .setAdmin(true);

        String string = "test";

        assertFalse(user1.equals(string), "Un utilisateur ne devrait pas être égal à un objet d'une classe différente.");
    }
}
