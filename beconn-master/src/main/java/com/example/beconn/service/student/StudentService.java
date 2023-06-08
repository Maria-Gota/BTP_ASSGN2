package com.example.beconn.service.student;

import com.example.beconn.dto.user.StudentDto;
import com.example.beconn.entity.user.Student;

import java.util.List;

public interface StudentService {

    StudentDto getById(Long id);

    StudentDto getByUserId(Long userId);

    List<StudentDto> getByTeacherId(Long teacherId);

    void create(Student student);

    void deleteById(Long id);

    void deleteByUserId(Long userId);
}
