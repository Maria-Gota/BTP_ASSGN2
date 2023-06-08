package com.example.beconn.service.exercise.multipleChoiceExercise;

import com.example.beconn.dto.exercise.MultipleChoiceExerciseDto;

import java.util.List;
import java.util.Map;

public interface MultipleChoiceExerciseService {

    MultipleChoiceExerciseDto getById(Long id);

    List<MultipleChoiceExerciseDto> getByCreatedBy(Long createdById);

    List<MultipleChoiceExerciseDto> getByCreatedByAndPurpose(Long createdById, String purpose);

    Map<String, List<MultipleChoiceExerciseDto>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId);

    void create(MultipleChoiceExerciseDto multipleChoiceExercise);

    void deleteById(Long id);
}
