package com.example.beconn.service.exercise.financialExercise;

import com.example.beconn.entity.exercise.FinancialExercise;

import java.util.List;
import java.util.Map;

public interface FinancialExerciseService {

    FinancialExercise getById(Long id);

    Map<String, List<FinancialExercise>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId);

    List<FinancialExercise> getByCreatedBy(Long createdBy);

    List<FinancialExercise> getByCreatedByAndPurpose(Long createdBy, String purpose);

    List<FinancialExercise> getByCreatedByAndExerciseType(Long createdBy, String exerciseType);

    void create(FinancialExercise financialExercise);

    void deleteById(Long id);

    void deleteByCreatedBy(Long createdBy);
}
