package com.example.beconn.mapper.student;

import com.example.beconn.dto.studentQuizPerformanceDto.StudentQuizPerformanceDto;
import com.example.beconn.dto.studentStatsDto.StudentStatsDto;
import com.example.beconn.dto.user.StudentDto;
import com.example.beconn.entity.studentStats.StudentStats;
import com.example.beconn.service.student.StudentService;
import com.example.beconn.service.studentQuizPerformance.StudentQuizPerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StudentStatsMapper {

    @Autowired
    private StudentQuizPerformanceService studentQuizPerformanceService;

    @Autowired
    private StudentService studentService;


    public StudentStatsDto toDto(StudentStats studentStats) {

        Long id = studentStats.getId();
        Long studentId = studentStats.getStudentId();
        Integer effortPoints = studentStats.getEffortPoints();
        Integer assessmentPoints = studentStats.getAssessmentPoints();
        Integer exerciseSolutionGrant = studentStats.getExerciseSolutionGrant();
        Integer quizTryGrant = studentStats.getQuizTryGrant();

        StudentQuizPerformanceDto studentQuizPerformanceDto = studentQuizPerformanceService.getByStudentId(studentId);
        StudentDto studentDto = studentService.getById(studentId);
        StudentStatsDto studentStatsDto = new StudentStatsDto(id,studentDto,studentQuizPerformanceDto,assessmentPoints,effortPoints,exerciseSolutionGrant,quizTryGrant);
        return studentStatsDto;
    }

    public List<StudentStatsDto> toDto(List<StudentStats> studentStatsList) {
        List<StudentStatsDto> result = new ArrayList<>();

        studentStatsList.forEach(studentStats -> {
            StudentStatsDto dto = toDto(studentStats);
            result.add(dto);
        });

        return result;
    }
}
