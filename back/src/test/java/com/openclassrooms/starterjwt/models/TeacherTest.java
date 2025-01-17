package com.openclassrooms.starterjwt.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class TeacherTest {

    private Teacher teacher;

    @BeforeEach
    void setUp() {
        teacher = new Teacher();
        teacher.setLastName("gmail");
        teacher.setFirstName("random");
        teacher.setCreatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
        teacher.setUpdatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
    }

    @Test
    void testTeacherAdd() {
        Teacher newTeacher = new Teacher();
        newTeacher.setId(1L);
        newTeacher.setLastName("DELAHAYE");
        newTeacher.setFirstName("Margot");
        newTeacher.setCreatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
        newTeacher.setUpdatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));

        assertNotNull(newTeacher);
        assertEquals(1L, newTeacher.getId());
        assertEquals("DELAHAYE", newTeacher.getLastName());
        assertEquals("Margot", newTeacher.getFirstName());
        assertEquals(LocalDateTime.of(2025, 1, 17, 14, 15, 59), newTeacher.getCreatedAt());
        assertEquals(LocalDateTime.of(2025, 1, 17, 14, 15, 59), newTeacher.getUpdatedAt());
    }
    @Test
    void testToString() {
        Teacher newTeacher = new Teacher();
        newTeacher.setId(1L);
        newTeacher.setLastName("DELAHAYE");
        newTeacher.setFirstName("Margot");
        newTeacher.setCreatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));
        newTeacher.setUpdatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59));


        String result = newTeacher.toString();
        System.out.println(result);
        assertTrue(result.contains("id=1"));
        assertTrue(result.contains("lastName=DELAHAYE"));
        assertTrue(result.contains("firstName=Margot"));
    }

}
