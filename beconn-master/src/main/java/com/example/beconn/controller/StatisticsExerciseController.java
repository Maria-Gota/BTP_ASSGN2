package com.example.beconn.controller;

import com.example.beconn.dto.exercise.StatisticsExerciseDto;
import com.example.beconn.service.exercise.statisticsExercise.StatisticsExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/statisticsExercise")
public class StatisticsExerciseController {

    @Autowired
    private StatisticsExerciseService service;

    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        StatisticsExerciseDto result = service.getById(id);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedBy/{createdBy}")
    public ResponseEntity<?> getByCreatedBy(@PathVariable Long createdBy) {
        List<StatisticsExerciseDto> result = service.getByCreatedBy(createdBy);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedByAndPurpose/{createdBy}/{purpose}")
    public ResponseEntity<?> getByCreatedByAndPurpose(@PathVariable Long createdBy, @PathVariable String purpose) {
        List<StatisticsExerciseDto> result = service.getByCreatedByAndPurpose(createdBy, purpose);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedByAndExerciseType/{createdBy}/{exerciseType}")
    public ResponseEntity<?> getByCreatedByAndExerciseType(@PathVariable Long createdBy, @PathVariable String exerciseType) {
        List<StatisticsExerciseDto> result = service.getByCreatedByAndExerciseType(createdBy, exerciseType);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getPracticeByCreatedByAndStudentIdGroupBySolved/{createdBy}/{studentId}")
    public ResponseEntity<?> getPracticeByCreatedByAndStudentIdGroupBySolved(@PathVariable Long createdBy, @PathVariable Long studentId) {

        Map<String, List<StatisticsExerciseDto>> result = service.getPracticeByCreatedByAndStudentIdGroupBySolved(createdBy, studentId);
        return new ResponseEntity<>(result, OK);
    }

    @PostMapping(value = "/post")
    public void post(@RequestBody StatisticsExerciseDto statisticsExerciseDto) {
        service.create(statisticsExerciseDto);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }

    @DeleteMapping(value = "/deleteByCreatedBy/{createdBy}")
    public void deleteByCreatedBy(@PathVariable Long createdBy) {
        service.deleteByCreatedBy(createdBy);
    }

}
