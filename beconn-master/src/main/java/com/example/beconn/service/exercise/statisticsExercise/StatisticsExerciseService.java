package com.example.beconn.service.exercise.statisticsExercise;

import com.example.beconn.dto.exercise.StatisticsExerciseDto;

import java.util.List;
import java.util.Map;

public interface StatisticsExerciseService {

    StatisticsExerciseDto getById(Long id);

    List<StatisticsExerciseDto> getByCreatedBy(Long createdBy);

    List<StatisticsExerciseDto> getByCreatedByAndPurpose(Long createdBy, String purpose);

    Map<String, List<StatisticsExerciseDto>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId);

    List<StatisticsExerciseDto> getByCreatedByAndExerciseType(Long createdBy, String exerciseType);

    void create(StatisticsExerciseDto statisticsExerciseDto);

    void deleteById(Long id);

    void deleteByCreatedBy(Long createdBy);
}
