package com.example.beconn.controller;

import com.example.beconn.dao.exercise.financialExercise.FinancialExerciseDao;
import com.example.beconn.entity.exercise.FinancialExercise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/financialExercise")
public class FinancialExerciseController {

    @Autowired
    private FinancialExerciseDao financialExerciseDao;


    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        FinancialExercise result = financialExerciseDao.getById(id);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedBy/{createdBy}")
    public ResponseEntity<?> getByCreatedBy(@PathVariable Long createdBy) {

        List<FinancialExercise> result = financialExerciseDao.getByCreatedBy(createdBy);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedByAndPurpose/{createdBy}/{purpose}")
    public ResponseEntity<?> getByCreatedByAndPurpose(@PathVariable Long createdBy, @PathVariable String purpose) {

        List<FinancialExercise> result = financialExerciseDao.getByCreatedByAndPurpose(createdBy, purpose);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getPracticeByCreatedByAndStudentIdGroupBySolved/{createdBy}/{studentId}")
    public ResponseEntity<?> getPracticeByCreatedByAndStudentIdGroupBySolved(@PathVariable Long createdBy, @PathVariable Long studentId) {

        Map<String, List<FinancialExercise>> result = financialExerciseDao.getPracticeByCreatedByAndStudentIdGroupBySolved(createdBy, studentId);
        System.out.println("RESULT: " + result);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByCreatedByAndExerciseType/{createdBy}/{exerciseType}")
    public ResponseEntity<?> getByCreatedBy(@PathVariable Long createdBy, @PathVariable String exerciseType) {

        List<FinancialExercise> result = financialExerciseDao.getByCreatedByAndExerciseType(createdBy, exerciseType);
        return new ResponseEntity<>(result, OK);
    }

    @PostMapping(value = "/post")
    public void post(@RequestBody FinancialExercise financialExercise) {
        financialExerciseDao.create(financialExercise);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {

        financialExerciseDao.deleteById(id);
    }

    @DeleteMapping(value = "/deleteByCreatedBy/{createdBy}")
    public void deleteByCreatedBy(@PathVariable Long createdBy) {

        financialExerciseDao.deleteByCreatedBy(createdBy);
    }
}
