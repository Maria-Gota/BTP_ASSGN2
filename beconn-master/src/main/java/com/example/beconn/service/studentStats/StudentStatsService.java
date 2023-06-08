package com.example.beconn.service.studentStats;

import com.example.beconn.dto.studentStatsDto.StudentStatsDto;
import com.example.beconn.entity.studentStats.StudentStats;

import java.util.List;

public interface StudentStatsService {

    StudentStatsDto getById(Long id);

    StudentStatsDto getByStudentId(Long studentId);

    List<StudentStatsDto> getByTeacherId(Long teacherId);

    void create(StudentStats studentStats);

    void update(StudentStats studentStats);

    void increaseExerciseSolutionGrant(Long id , Integer no);

    void decreaseExerciseSolutionGrant(Long id);

    void increaseQuizTryGrant(Long id , Integer no);

    void decreaseQuizTryGrant(Long id);
}
