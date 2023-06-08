package com.example.beconn.controller;

import com.example.beconn.dto.user.StudentDto;
import com.example.beconn.entity.user.Student;
import com.example.beconn.service.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping(value = "/{id}/id")
    public ResponseEntity<StudentDto> getById(@PathVariable Long id) {
        StudentDto student = studentService.getById(id);
        return new ResponseEntity<>(student, OK);
    }

    @GetMapping(value = "/{userId}/userId")
    public ResponseEntity<StudentDto> getByUserId(@PathVariable Long userId) {
        StudentDto student = studentService.getByUserId(userId);
        return new ResponseEntity<>(student, OK);
    }

    @GetMapping(value = "/{teacherId}/teacherId")
    public ResponseEntity<List<StudentDto>> getByTeacherId(@PathVariable Long teacherId) {
        List<StudentDto> result = studentService.getByTeacherId(teacherId);
        return new ResponseEntity<>(result, OK);
    }

    @DeleteMapping(value = "/{id}/id")
    public ResponseEntity<Student> deleteById(@PathVariable Long id) {
        studentService.deleteById(id);
        return new ResponseEntity<>(OK);
    }

    @DeleteMapping(value = "/{userId}/userId")
    public ResponseEntity<Student> deleteByUserId(@PathVariable Long userId) {
        studentService.deleteByUserId(userId);
        return new ResponseEntity<>(OK);
    }
}
