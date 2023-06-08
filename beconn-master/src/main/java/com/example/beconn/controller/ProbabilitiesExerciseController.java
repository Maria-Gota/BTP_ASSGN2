package com.example.beconn.controller;

import com.example.beconn.entity.exercise.ProbabilitiesExercise;
import com.example.beconn.service.exercise.probabilitiesExercise.ProbabilitiesExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/probabilitiesExercise")
public class ProbabilitiesExerciseController {

    @Autowired
    private ProbabilitiesExerciseService probabilitiesExerciseService;


    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        ProbabilitiesExercise result = probabilitiesExerciseService.getById(id);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedBy/{createdBy}")
    public ResponseEntity<?> getByCreatedBy(@PathVariable Long createdBy) {

        List<ProbabilitiesExercise> result = probabilitiesExerciseService.getByCreatedBy(createdBy);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedByAndPurpose/{createdBy}/{purpose}")
    public ResponseEntity<?> getByCreatedByAndPurpose(@PathVariable Long createdBy, @PathVariable String purpose) {

        List<ProbabilitiesExercise> result = probabilitiesExerciseService.getByCreatedByAndPurpose(createdBy, purpose);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getPracticeByCreatedByAndStudentIdGroupBySolved/{createdBy}/{studentId}")
    public ResponseEntity<?> getPracticeByCreatedByAndStudentIdGroupBySolved(@PathVariable Long createdBy, @PathVariable Long studentId) {

        Map<String, List<ProbabilitiesExercise>> result = probabilitiesExerciseService.getPracticeByCreatedByAndStudentIdGroupBySolved(createdBy, studentId);
        return new ResponseEntity<>(result, OK);
    }

    @PostMapping(value = "/post")
    public void post(@RequestBody ProbabilitiesExercise probabilitiesExercise) {

        probabilitiesExerciseService.create(probabilitiesExercise);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {

        probabilitiesExerciseService.deleteById(id);
    }

    @DeleteMapping(value = "/deleteByCreatedBy/{createdBy}")
    public void deleteByCreatedBy(@PathVariable Long createdBy) {

        probabilitiesExerciseService.deleteByCreatedBy(createdBy);
    }

}
