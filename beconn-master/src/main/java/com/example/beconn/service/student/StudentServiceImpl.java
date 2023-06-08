package com.example.beconn.service.student;

import com.example.beconn.dao.student.StudentDao;
import com.example.beconn.dto.user.StudentDto;
import com.example.beconn.entity.user.Student;
import com.example.beconn.mapper.student.StudentMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao dao;

    @Autowired
    private StudentMapper mapper;


    @Override
    public StudentDto getById(Long id) {

        Student student = dao.getById(id);
        StudentDto dto = mapper.toDto(student);
        return dto;
    }

    @Override
    public StudentDto getByUserId(Long userId) {
        Student student = dao.getByUserId(userId);
        StudentDto dto = mapper.toDto(student);
        return dto;
    }

    @Override
    public List<StudentDto> getByTeacherId(Long teacherId) {
        List<Student> studentList = dao.getByTeacherId(teacherId);
        List<StudentDto> studentDtoList = mapper.toDto(studentList);
        return studentDtoList;
    }

    @Override
    @Transactional
    public void create(Student student) {

        dao.create(student);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        dao.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteByUserId(Long userId) {

        dao.deleteByUserId(userId);
    }
}
