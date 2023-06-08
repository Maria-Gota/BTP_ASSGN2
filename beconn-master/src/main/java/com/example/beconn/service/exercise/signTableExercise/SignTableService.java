package com.example.beconn.service.exercise.signTableExercise;

import com.example.beconn.dto.exercise.LinearSignTableExerciseDto;
import com.example.beconn.dto.exercise.QuadraticSignTableExerciseDto;

import java.util.List;
import java.util.Map;

public interface SignTableService {

    LinearSignTableExerciseDto getLinearById(Long id);

    QuadraticSignTableExerciseDto getQuadraticById(Long id);

    List<LinearSignTableExerciseDto> getByFunctionTypeLinearAndCreatedBy(Long createdBy);

    List<QuadraticSignTableExerciseDto> getByFunctionTypeQuadraticAndCreatedBy(Long createdBy);

    List<LinearSignTableExerciseDto> getByFunctionTypeLinearAndCreatedByAndPurpose(Long createdBy, String purpose);

    List<QuadraticSignTableExerciseDto> getByFunctionTypeQuadraticAndCreatedByAndPurpose(Long createdBy, String purpose);


    Map<String, List<LinearSignTableExerciseDto>> getPracticeLinearSignTableByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId);

    Map<String, List<QuadraticSignTableExerciseDto>> getPracticeQuadraticSignTableByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId);

    void createLinear(LinearSignTableExerciseDto linearSignTableExerciseDto);

    void createQuadratic(QuadraticSignTableExerciseDto quadraticSignTableExerciseDto);

    void deleteById(Long id);
}
