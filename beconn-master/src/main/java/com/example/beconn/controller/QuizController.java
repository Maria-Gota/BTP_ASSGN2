package com.example.beconn.controller;

import com.example.beconn.dto.quiz.QuizCreationDto;
import com.example.beconn.dto.quiz.QuizDto;
import com.example.beconn.service.quiz.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        QuizDto result = quizService.getById(id);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedBy/{createdBy}")
    public ResponseEntity<?> getByCreatedBy(@PathVariable Long createdBy) {

        List<QuizDto> result = quizService.getByCreatedBy(createdBy);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedByAndQuizType/{createdBy}/{quizType}")
    public ResponseEntity<?> getByCreatedByAndQuizType(@PathVariable Long createdBy, @PathVariable String quizType) {

        List<QuizDto> result = quizService.getByCreatedByAndQuizType(createdBy, quizType);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedByAndQuizTypeAndVisibility/{createdBy}/{quizType}")
    public ResponseEntity<?> getByCreatedByAndQuizTypeAndVisibility(@PathVariable Long createdBy, @PathVariable String quizType) {

        List<QuizDto> result = quizService.getByCreatedByAndQuizTypeAndVisibility(createdBy, quizType);
        return new ResponseEntity<>(result, OK);
    }


    @PostMapping(value = "/post")
    public void post(@RequestBody QuizCreationDto quiz) {
        System.out.println("CREATING A QUIZ");
        quizService.create(quiz);
    }

    @PutMapping(value = "/updateVisibility/{quizId}")
    public void updateVisibility(@PathVariable Long quizId) {
        quizService.updateVisibility(quizId);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {
        quizService.deleteById(id);
    }

    @DeleteMapping(value = "/deleteByCreatedBy/{createdBy}")
    public void deleteByCreatedBy(@PathVariable Long createdBy) {
        quizService.deleteByCreatedBy(createdBy);
    }
}
