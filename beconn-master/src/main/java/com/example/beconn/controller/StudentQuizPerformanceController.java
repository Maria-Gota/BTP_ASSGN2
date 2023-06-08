package com.example.beconn.controller;

import com.example.beconn.dto.studentQuizPerformanceDto.StudentQuizPerformanceDto;
import com.example.beconn.service.studentQuizPerformance.StudentQuizPerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/studentQuizPerformance")
public class StudentQuizPerformanceController {

    @Autowired
    private StudentQuizPerformanceService studentQuizPerformanceService;

    @GetMapping(value = "/getByStudentId/{studentId}")
    public ResponseEntity<?> getByStudentId(@PathVariable Long studentId) {

        System.out.println("RETRIEVING STUDENT PERFORMANCE FOR STUDENT " + studentId);
        StudentQuizPerformanceDto result = studentQuizPerformanceService.getByStudentId(studentId);
        return new ResponseEntity<>(result, OK);
    }
}
