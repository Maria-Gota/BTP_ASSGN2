package com.example.beconn.dao.student;

import com.example.beconn.entity.user.Student;

import java.util.List;

public interface StudentDao {

    Student getById(Long id);

    Student getByUserId(Long userId);

    List<Student> getByTeacherId(Long teacherId);

    void create(Student student);

    void deleteById(Long id);

    void deleteByUserId(Long userId);
}
