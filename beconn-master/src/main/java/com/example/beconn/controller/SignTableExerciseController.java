package com.example.beconn.controller;

import com.example.beconn.dto.exercise.LinearSignTableExerciseDto;
import com.example.beconn.dto.exercise.QuadraticSignTableExerciseDto;
import com.example.beconn.service.exercise.signTableExercise.SignTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/signTableExercise")
public class SignTableExerciseController {

    @Autowired
    private SignTableService service;

    @GetMapping(value = "/getByTypeLinearAndCreatedBy/{createdBy}")
    public ResponseEntity<?> getByTypeLinearAndCreatedBy(@PathVariable Long createdBy){
        List<LinearSignTableExerciseDto> result = service.getByFunctionTypeLinearAndCreatedBy(createdBy);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = "/getByTypeQuadraticAndCreatedBy/{createdBy}")
    public ResponseEntity<?> getByTypeQuadraticAndCreatedBy(@PathVariable Long createdBy){
        List<QuadraticSignTableExerciseDto> result = service.getByFunctionTypeQuadraticAndCreatedBy(createdBy);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = "/getByTypeLinearAndCreatedByAndPurpose/{createdBy}/{purpose}")
    public ResponseEntity<?> getByTypeLinearAndCreatedByAndPurpose(@PathVariable Long createdBy, @PathVariable String purpose){
        List<LinearSignTableExerciseDto> result = service.getByFunctionTypeLinearAndCreatedByAndPurpose(createdBy, purpose);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = "/getByTypeQuadraticAndCreatedByAndPurpose/{createdBy}/{purpose}")
    public ResponseEntity<?> getByTypeQuadraticAndCreatedByAndPurpose(@PathVariable Long createdBy, @PathVariable String purpose){
        List<QuadraticSignTableExerciseDto> result = service.getByFunctionTypeQuadraticAndCreatedByAndPurpose(createdBy, purpose);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = "/getLinearSignTablePracticeByCreatedByAndStudentIdGroupBySolved/{createdBy}/{studentId}")
    public ResponseEntity<?> getLinearSignTablePracticeByCreatedByAndStudentIdGroupBySolved(@PathVariable Long createdBy,@PathVariable Long studentId) {

        Map<String,List<LinearSignTableExerciseDto>> result = service.getPracticeLinearSignTableByCreatedByAndStudentIdGroupBySolved(createdBy,studentId);
        return new ResponseEntity<>(result,OK);
    }

    @GetMapping(value = "/getQuadraticSignTablePracticeByCreatedByAndStudentIdGroupBySolved/{createdBy}/{studentId}")
    public ResponseEntity<?> getQuadraticSignTablePracticeByCreatedByAndStudentIdGroupBySolved(@PathVariable Long createdBy,@PathVariable Long studentId) {

        Map<String,List<QuadraticSignTableExerciseDto>> result = service.getPracticeQuadraticSignTableByCreatedByAndStudentIdGroupBySolved(createdBy,studentId);
        return new ResponseEntity<>(result,OK);
    }
    @PostMapping(value = "/postLinear")
    public void post(@RequestBody LinearSignTableExerciseDto exercise) {
        service.createLinear(exercise);
    }

    @PostMapping(value = "/postQuadratic")
    public void post(@RequestBody QuadraticSignTableExerciseDto exercise) {
        service.createQuadratic(exercise);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }
}
