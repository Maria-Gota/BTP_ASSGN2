package com.example.beconn.dto.studentQuiz;

import com.example.beconn.dto.user.StudentDto;
import com.example.beconn.entity.studentQuiz.StudentQuizExercise;

import java.time.LocalDateTime;
import java.util.List;

public class StudentQuizDto {

    private Long id;

    private Long quizId;

    private StudentDto studentDto;

    private Integer score;

    private Integer triesLeft;

    private Integer timesAccessed;

    private LocalDateTime lastAccessed;

    private List<StudentQuizExercise> quizExercises;

    private Boolean solved;

    public StudentQuizDto() {
    }

    public StudentQuizDto(Long id, Long quizId, StudentDto studentDto, Integer score, Integer triesLeft, Integer timesAccessed, LocalDateTime lastAccessed, List<StudentQuizExercise> quizExercises, Boolean solved) {
        this.id = id;
        this.quizId = quizId;
        this.studentDto = studentDto;
        this.score = score;
        this.triesLeft = triesLeft;
        this.timesAccessed = timesAccessed;
        this.lastAccessed = lastAccessed;
        this.quizExercises = quizExercises;
        this.solved = solved;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public StudentDto getStudentDto() {
        return studentDto;
    }

    public void setStudentDto(StudentDto studentDto) {
        this.studentDto = studentDto;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getTriesLeft() {
        return triesLeft;
    }

    public void setTriesLeft(Integer triesLeft) {
        this.triesLeft = triesLeft;
    }

    public Integer getTimesAccessed() {
        return timesAccessed;
    }

    public void setTimesAccessed(Integer timesAccessed) {
        this.timesAccessed = timesAccessed;
    }

    public LocalDateTime getLastAccessed() {
        return lastAccessed;
    }

    public void setLastAccessed(LocalDateTime lastAccessed) {
        this.lastAccessed = lastAccessed;
    }

    public List<StudentQuizExercise> getQuizExercises() {
        return quizExercises;
    }

    public void setQuizExercises(List<StudentQuizExercise> quizExercises) {
        this.quizExercises = quizExercises;
    }

    public Boolean getSolved() {
        return solved;
    }

    public void setSolved(Boolean solved) {
        this.solved = solved;
    }

    @Override
    public String toString() {
        return "StudentQuizDto{" +
                "id=" + id +
                ", quizId=" + quizId +
                ", studentDto=" + studentDto +
                ", score=" + score +
                ", triesLeft=" + triesLeft +
                ", timesAccessed=" + timesAccessed +
                ", lastAccessed=" + lastAccessed +
                ", quizExercises=" + quizExercises +
                ", solved=" + solved +
                '}';
    }
}
