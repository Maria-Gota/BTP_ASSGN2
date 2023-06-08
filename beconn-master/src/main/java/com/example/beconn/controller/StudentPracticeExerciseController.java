package com.example.beconn.controller;

import com.example.beconn.entity.studentPracticeExercise.StudentPracticeExercise;
import com.example.beconn.service.studentPracticeExercise.StudentPracticeExerciseService;
import jdk.swing.interop.SwingInterOpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/studentPracticeExercise")
public class StudentPracticeExerciseController {

    @Autowired
    private StudentPracticeExerciseService studentPracticeExerciseService;

    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        StudentPracticeExercise result = studentPracticeExerciseService.getById(id);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByStudentId/{studentId}")
    public ResponseEntity<?> getByStudentId(@PathVariable Long studentId) {

        List<StudentPracticeExercise> result = studentPracticeExerciseService.getByStudentId(studentId);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByStudentIdAndExerciseId/{studentId}/{exerciseId}")
    public ResponseEntity<?> getByStudentIdAndExerciseId(@PathVariable Long studentId, @PathVariable Long exerciseId) {

        StudentPracticeExercise result = studentPracticeExerciseService.getByStudentIdAndExerciseId(studentId, exerciseId);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByStudentIdAndExerciseIdOrCreate/{studentId}/{exerciseId}")
    public ResponseEntity<?> getByStudentIdAndExerciseIdOrCreate(@PathVariable Long studentId, @PathVariable Long exerciseId) {

        System.out.println("HAVE TO RETRIEVE EXERCISE OR CREATE");
        StudentPracticeExercise result = studentPracticeExerciseService.getByStudentIdAndExerciseIdOrCreate(studentId, exerciseId);
        return new ResponseEntity<>(result, OK);
    }

    @PostMapping(value = "/post")
    public void create(@RequestBody StudentPracticeExercise studentPracticeExercise) {

        studentPracticeExerciseService.create(studentPracticeExercise);
    }

    @PutMapping(value = "/update")
    public void update(@RequestBody StudentPracticeExercise studentPracticeExercise) {
        studentPracticeExerciseService.update(studentPracticeExercise);
    }
}
