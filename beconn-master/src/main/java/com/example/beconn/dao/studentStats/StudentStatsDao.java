package com.example.beconn.dao.studentStats;

import com.example.beconn.dto.studentStatsDto.StudentStatsDto;
import com.example.beconn.entity.studentStats.StudentStats;

import java.util.List;

public interface StudentStatsDao {

    StudentStats getById(Long id);

    StudentStats getByStudentId(Long studentId);

    List<StudentStats> getByTeacherId(Long teacherId);

    void create(StudentStats studentStats);

    void update(StudentStats studentStats);

    void increaseExerciseSolutionGrant(Long id , Integer no);

    void decreaseExerciseSolutionGrant(Long id);

    void increaseQuizTryGrant(Long id , Integer no);

    void decreaseQuizTryGrant(Long id);
}
