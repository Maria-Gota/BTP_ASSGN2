package com.example.beconn.dto.studentStatsDto;

import com.example.beconn.dto.studentQuizPerformanceDto.StudentQuizPerformanceDto;
import com.example.beconn.dto.user.StudentDto;

public class StudentStatsDto {

    private Long id;

    private StudentDto studentDto;

    private StudentQuizPerformanceDto quizPerformanceDto;

    private Integer assessmentPoints;

    private Integer effortPoints;

    private Integer exerciseSolutionGrant;

    private Integer quizTryGrant;

    public StudentStatsDto(Long id, StudentDto studentDto,StudentQuizPerformanceDto quizPerformanceDto, Integer assessmentPoints, Integer effortPoints, Integer exerciseSolutionGrant, Integer quizTryGrant) {
        this.id = id;
        this.studentDto = studentDto;
        this.quizPerformanceDto = quizPerformanceDto;
        this.assessmentPoints = assessmentPoints;
        this.effortPoints = effortPoints;
        this.exerciseSolutionGrant = exerciseSolutionGrant;
        this.quizTryGrant = quizTryGrant;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StudentDto getStudentDto() {
        return studentDto;
    }

    public void setStudentDto(StudentDto studentDto) {
        this.studentDto = studentDto;
    }

    public StudentQuizPerformanceDto getQuizPerformanceDto() {
        return quizPerformanceDto;
    }

    public void setQuizPerformanceDto(StudentQuizPerformanceDto quizPerformanceDto) {
        this.quizPerformanceDto = quizPerformanceDto;
    }

    public Integer getAssessmentPoints() {
        return assessmentPoints;
    }

    public void setAssessmentPoints(Integer assessmentPoints) {
        this.assessmentPoints = assessmentPoints;
    }

    public Integer getEffortPoints() {
        return effortPoints;
    }

    public void setEffortPoints(Integer effortPoints) {
        this.effortPoints = effortPoints;
    }

    public Integer getExerciseSolutionGrant() {
        return exerciseSolutionGrant;
    }

    public void setExerciseSolutionGrant(Integer exerciseSolutionGrant) {
        this.exerciseSolutionGrant = exerciseSolutionGrant;
    }

    public Integer getQuizTryGrant() {
        return quizTryGrant;
    }

    public void setQuizTryGrant(Integer quizTryGrant) {
        this.quizTryGrant = quizTryGrant;
    }
}
