package com.example.beconn.controller;


import com.example.beconn.dto.studentQuiz.StudentQuizDto;
import com.example.beconn.dto.user.StudentDto;
import com.example.beconn.service.studentQuiz.StudentQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/studentQuiz")
public class StudentQuizController {

    @Autowired
    private StudentQuizService service;


    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        StudentQuizDto result = service.getById(id);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByQuizId/{quizId}")
    public ResponseEntity<?> getByQuizId(@PathVariable Long quizId) {

        List<StudentQuizDto> result = service.getByQuizId(quizId);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByStudentId/{studentId}")
    public ResponseEntity<?> getByStudentId(@PathVariable Long studentId) {

        List<StudentQuizDto> result = service.getByStudentId(studentId);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByStudentIdAndQuizId/{studentId}/{quizId}")
    public ResponseEntity<?> getByStudentIdAndQuizId(@PathVariable Long studentId, @PathVariable Long quizId) {

        StudentQuizDto result = service.getByStudentIdAndQuizIdOrCreate(studentId, quizId);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByQuizIdAndSolved/{quizId}")
    public ResponseEntity<?> getByQuizIdAndSolved(@PathVariable Long quizId) {

        List<StudentQuizDto> result = service.getByQuizIdAndSolved(quizId);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByQuizIdAndNotSolved/{quizId}/{teacherId}")
    public ResponseEntity<?> getByQuizIdAndNotSolved(@PathVariable Long quizId, @PathVariable Long teacherId) {

        List<StudentDto> result = service.getStudentsThatDidNotSolveByQuizId(quizId, teacherId);
        System.out.println(result);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByStudentIdAndSolved/{studentId}/{solved}")
    public ResponseEntity<?> getByStudentIdAndSolved(@PathVariable Long studentId, @PathVariable Boolean solved) {

        List<StudentQuizDto> result = service.getByStudentIdAndSolved(studentId, solved);
        return new ResponseEntity<>(result, OK);
    }

    @PutMapping(value = "/decreaseTriesLeft/{id}")
    public void decreaseTriesLeft(@PathVariable Long id) {

        service.decreaseTriesLeft(id);
    }

    @PutMapping(value = "/updateTriesLeft/{id}/{triesLeft}")
    public void updateTriesLeft(@PathVariable Long id, @PathVariable Integer triesLeft) {

        service.updateTriesLeft(id, triesLeft);
    }

    @PutMapping(value = "/update")
    public void update(@RequestBody StudentQuizDto studentQuiz) {
        service.update(studentQuiz);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }


}
