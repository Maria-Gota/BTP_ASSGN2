package com.example.beconn.dao.exercise.signTableExercise;

import com.example.beconn.entity.exercise.SignTableExercise;

import java.util.List;
import java.util.Map;

public interface SignTableExerciseDao {

    SignTableExercise getById(Long id);
    List<SignTableExercise> getByFunctionTypeLinearAndCreatedBy(Long createdBy);

    List<SignTableExercise> getByFunctionTypeQuadraticAndCreatedBy(Long createdBy);
    List<SignTableExercise> getByFunctionTypeLinearAndCreatedByAndPurpose(Long createdBy, String purpose);

    List<SignTableExercise> getByFunctionTypeQuadraticAndCreatedByAndPurpose(Long createdBy, String purpose);

    Map<String, List<SignTableExercise>> getPracticeLinearSignTableByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId);

    Map<String, List<SignTableExercise>> getPracticeQuadraticSignTableByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId);

    void create(SignTableExercise signTableExercise);
    void deleteById(Long id);
}
