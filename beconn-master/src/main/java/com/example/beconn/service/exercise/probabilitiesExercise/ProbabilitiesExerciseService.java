package com.example.beconn.service.exercise.probabilitiesExercise;

import com.example.beconn.entity.exercise.ProbabilitiesExercise;

import java.util.List;
import java.util.Map;

public interface ProbabilitiesExerciseService {

    List<ProbabilitiesExercise> getByCreatedBy(Long createdBy);

    List<ProbabilitiesExercise> getByCreatedByAndPurpose(Long createdBy, String purpose);

    Map<String, List<ProbabilitiesExercise>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId);

    ProbabilitiesExercise getById(Long id);

    void create(ProbabilitiesExercise probabilitiesExercise);

    void deleteById(Long id);

    void deleteByCreatedBy(Long createdBy);
}
