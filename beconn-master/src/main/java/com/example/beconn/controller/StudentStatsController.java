package com.example.beconn.controller;

import com.example.beconn.dto.studentStatsDto.StudentStatsDto;
import com.example.beconn.entity.studentStats.StudentStats;
import com.example.beconn.service.studentStats.StudentStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/studentStats")
public class StudentStatsController {

    @Autowired
    private StudentStatsService studentStatsService;

    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        StudentStatsDto result = studentStatsService.getById(id);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByStudentId/{studentId}")
    public ResponseEntity<?> getByStudentId(@PathVariable Long studentId) {

        StudentStatsDto result = studentStatsService.getByStudentId(studentId);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByTeacherId/{teacherId}")
    public ResponseEntity<?> getByTeacherId(@PathVariable Long teacherId) {

        List<StudentStatsDto> result = studentStatsService.getByTeacherId(teacherId);
        return new ResponseEntity<>(result, OK);
    }

    // no create endpoint

    @PutMapping(value = "/update")
    public void update(@RequestBody StudentStats studentStats) {
        studentStatsService.update(studentStats);
    }

    @PutMapping(value = "/increaseExerciseSolutionGrant/{id}/{no}")
    public void increaseExerciseSolutionGrant(@PathVariable Long id, @PathVariable Integer no) {
        studentStatsService.increaseExerciseSolutionGrant(id, no);
    }

    @PutMapping(value = "/decreaseExerciseSolutionGrant/{id}")
    public void decreaseExerciseSolutionGrant(@PathVariable Long id) {
        studentStatsService.decreaseExerciseSolutionGrant(id);
    }

    @PutMapping(value = "/increaseQuizTryGrant/{id}/{no}")
    public void increaseQuizTryGrant(@PathVariable Long id, @PathVariable Integer no) {
        studentStatsService.increaseQuizTryGrant(id, no);
    }

    @PutMapping(value = "/decreaseQuizTryGrant/{id}")
    public void decreaseQuizTryGrant(@PathVariable Long id) {
        studentStatsService.decreaseQuizTryGrant(id);
    }

}
