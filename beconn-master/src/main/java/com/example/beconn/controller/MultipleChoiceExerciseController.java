package com.example.beconn.controller;

import com.example.beconn.dto.exercise.MultipleChoiceExerciseDto;
import com.example.beconn.service.exercise.multipleChoiceExercise.MultipleChoiceExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/multipleChoiceExercise")
public class MultipleChoiceExerciseController {

    @Autowired
    private MultipleChoiceExerciseService service;


    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        MultipleChoiceExerciseDto result = service.getById(id);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedBy/{createdBy}")
    public ResponseEntity<?> getByCreatedBy(@PathVariable Long createdBy) {
        List<MultipleChoiceExerciseDto> result = service.getByCreatedBy(createdBy);
        ResponseEntity<?> responseEntity = new ResponseEntity<>(result, OK);
        System.out.println("RESPONSE:: " + responseEntity);
        return responseEntity;
    }

    @GetMapping(value = "/getByCreatedByAndPurpose/{createdBy}/{purpose}")
    public ResponseEntity<?> getByCreatedByAndPurpose(@PathVariable Long createdBy, @PathVariable String purpose) {
        List<MultipleChoiceExerciseDto> result = service.getByCreatedByAndPurpose(createdBy, purpose);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getPracticeByCreatedByAndStudentIdGroupBySolved/{createdBy}/{studentId}")
    public ResponseEntity<?> getPracticeByCreatedByAndStudentIdGroupBySolved(@PathVariable Long createdBy, @PathVariable Long studentId) {
        Map<String, List<MultipleChoiceExerciseDto>> result = service.getPracticeByCreatedByAndStudentIdGroupBySolved(createdBy, studentId);
        return new ResponseEntity<>(result, OK);

    }

    @PostMapping(value = "/post")
    public void post(@RequestBody MultipleChoiceExerciseDto exercise) {
        service.create(exercise);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }

}
