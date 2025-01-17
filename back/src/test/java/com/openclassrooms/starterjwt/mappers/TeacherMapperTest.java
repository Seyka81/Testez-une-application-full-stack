package com.openclassrooms.starterjwt.mappers;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TeacherMapperTest {

    private TeacherMapper teacherMapper;

    @BeforeEach
    void setUp() {
        teacherMapper = Mappers.getMapper(TeacherMapper.class);
    }

    @Test
    void testTeacherToTeacherDto() {
        Teacher teacher = Teacher.builder()
                .id(1L)
                .lastName("gmail")
                .firstName("random")
                .createdAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59))
                .updatedAt(LocalDateTime.of(2025, 1, 17, 14, 15, 59))
                .build();

        TeacherDto teacherDto = teacherMapper.toDto(teacher);

        assertNotNull(teacherDto);
        assertEquals(teacher.getId(), teacherDto.getId());
        assertEquals(teacher.getLastName(), teacherDto.getLastName());
        assertEquals(teacher.getFirstName(), teacherDto.getFirstName());
        assertEquals(teacher.getCreatedAt(), teacherDto.getCreatedAt());
        assertEquals(teacher.getUpdatedAt(), teacherDto.getUpdatedAt());
    }

    @Test
    void testTeacherDtoToTeacher() {
        TeacherDto teacherDto = new TeacherDto(
                1L,
                "gmail",
                "random",
                LocalDateTime.of(2025, 1, 17, 14, 15, 59),
                LocalDateTime.of(2025, 1, 17, 14, 15, 59));

        Teacher teacher = teacherMapper.toEntity(teacherDto);

        assertNotNull(teacher);
        assertEquals(teacherDto.getId(), teacher.getId());
        assertEquals(teacherDto.getLastName(), teacher.getLastName());
        assertEquals(teacherDto.getFirstName(), teacher.getFirstName());
        assertEquals(teacherDto.getCreatedAt(), teacher.getCreatedAt());
        assertEquals(teacherDto.getUpdatedAt(), teacher.getUpdatedAt());
    }

    @Test
    void testNullHandling() {
        assertNotNull(teacherMapper);
        assertNull(teacherMapper.toDto((Teacher) null));
        assertNull(teacherMapper.toEntity((TeacherDto) null));
    }

    @Test
    void testInvalidTeacherMapping() {
        Teacher teacher = Teacher.builder()
                .id(null)
                .firstName("Margot")
                .lastName(null)
                .build();

        TeacherDto teacherDto = teacherMapper.toDto(teacher);

        assertNull(teacherDto.getId());
        assertEquals("Margot", teacherDto.getFirstName());
        assertNull(teacherDto.getLastName());
    }

    @Test
    void testPartialTeacherToTeacherDto() {
        Teacher teacher = Teacher.builder()
                .id(1L)
                .lastName(null)
                .firstName("random")
                .build();

        TeacherDto teacherDto = teacherMapper.toDto(teacher);

        assertNotNull(teacherDto);
        assertEquals(teacher.getId(), teacherDto.getId());
        assertEquals(teacher.getFirstName(), teacherDto.getFirstName());
        assertNull(teacherDto.getLastName());
    }

    @Test
    void testToEntity_withValidDtoList() {
        TeacherDto dto1 = new TeacherDto(1L, "gmail", "random", LocalDateTime.now(), LocalDateTime.now());
        List<TeacherDto> dtoList = Arrays.asList(dto1);

        List<Teacher> entityList = teacherMapper.toEntity(dtoList);

        assertNotNull(entityList);
        assertEquals(1, entityList.size());

        assertEquals(dto1.getId(), entityList.get(0).getId());
        assertEquals(dto1.getFirstName(), entityList.get(0).getFirstName());
    }
}
