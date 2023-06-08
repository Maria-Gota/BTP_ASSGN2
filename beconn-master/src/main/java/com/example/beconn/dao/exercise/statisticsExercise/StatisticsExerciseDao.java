package com.example.beconn.dao.exercise.statisticsExercise;

import com.example.beconn.entity.exercise.StatisticsExercise;

import java.util.List;
import java.util.Map;

public interface StatisticsExerciseDao {

    StatisticsExercise getById(Long id);

    List<StatisticsExercise> getByCreatedBy(Long createdBy);

    List<StatisticsExercise> getByCreatedByAndPurpose(Long createdBy, String purpose);

    List<StatisticsExercise> getByCreatedByAndExerciseType(Long createdBy, String exerciseType);

    Map<String, List<StatisticsExercise>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId);

    void create(StatisticsExercise statisticsExercise);

    void deleteById(Long id);

    void deleteByCreatedBy(Long createdBy);
}
