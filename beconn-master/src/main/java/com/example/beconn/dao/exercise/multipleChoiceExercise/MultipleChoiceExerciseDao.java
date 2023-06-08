package com.example.beconn.dao.exercise.multipleChoiceExercise;

import com.example.beconn.entity.exercise.MultipleChoiceExercise;

import java.util.List;
import java.util.Map;

public interface MultipleChoiceExerciseDao {

    MultipleChoiceExercise getById(Long id);

    List<MultipleChoiceExercise> getByCreatedBy(Long createdById);

    List<MultipleChoiceExercise> getByCreatedByAndPurpose(Long createdById, String purpose);

    Map<String, List<MultipleChoiceExercise>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId);

    void create(MultipleChoiceExercise multipleChoiceExercise);

    void deleteById(Long id);
}
