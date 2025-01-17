package com.openclassrooms.starterjwt.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class SessionTest {

    private Session session;
    private Session session2;
    private Teacher teacher;
    private User user;

    @BeforeEach
    void setUp() {
        teacher = new Teacher();
        teacher.setId(1L);
        teacher.setLastName("DELAHAYE");
        teacher.setFirstName("Margot");

        user = new User();
        user.setId(1L);
        user.setEmail("random@gmail.com");
        user.setLastName("gmail");
        user.setFirstName("random");
        user.setPassword("password");
        user.setAdmin(false);

        session = new Session();
        session.setId(1L);
        session.setName("Relax With Yoga");
        session.setDate(new Date());
        session.setDescription("A relaxing yoga session");
        session.setTeacher(teacher);
        session.setUsers(Collections.singletonList(user));
        session.setCreatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
        session.setUpdatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));

        session2 = new Session();
        session2.setId(2L);
        session2.setName("Strength Yoga");
        session2.setDate(new Date());
        session2.setDescription("An intense yoga session");
        session2.setTeacher(teacher);
        session2.setUsers(Collections.singletonList(user));
        session2.setCreatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
        session2.setUpdatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
    }

    @Test
    void testSessionAdd() {
        Session newSession = new Session();
        newSession.setId(1L);
        newSession.setName("Relax With Yoga");
        newSession.setDate(new Date());
        newSession.setDescription("A relaxing yoga session");
        newSession.setTeacher(teacher);
        newSession.setUsers(Collections.singletonList(user));
        newSession.setCreatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
        newSession.setUpdatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));

        assertNotNull(newSession);
        assertEquals(1L, newSession.getId());
        assertEquals("Relax With Yoga", newSession.getName());
        assertNotNull(newSession.getDate());
        assertEquals("A relaxing yoga session", newSession.getDescription());
        assertEquals(teacher, newSession.getTeacher());
        assertEquals(1, newSession.getUsers().size());
        assertEquals(user, newSession.getUsers().get(0));
        assertEquals(LocalDateTime.of(2025, 1, 17, 14, 15, 59), newSession.getCreatedAt());
        assertEquals(LocalDateTime.of(2025, 1, 17, 14, 15, 59), newSession.getUpdatedAt());
    }

    @Test
    void testEquals_withDifferentId() {
        assertNotEquals(session, session2);
    }

    @Test
    void testEquals_withNull() {
        assertNotEquals(session, null);
    }

    @Test
    void testEquals_withSameObject() {
        assertEquals(session, session);
    }

}
