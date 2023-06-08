package com.example.beconn.dto.quiz;

import java.util.List;

public class QuizCreationDto {

    private Long id;

    private Long createdBy;

    private String quizType;

    private List<Long> exercises;

    private String quizName;

    private String difficulty;

    private Boolean visibility;

    public QuizCreationDto() {
    }

    public QuizCreationDto(Long id, Long createdBy, String quizType, List<Long> exercises, String quizName, String difficulty, Boolean visibility) {
        this.id = id;
        this.createdBy = createdBy;
        this.quizType = quizType;
        this.exercises = exercises;
        this.quizName = quizName;
        this.difficulty = difficulty;
        this.visibility = visibility;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public String getQuizType() {
        return quizType;
    }

    public void setQuizType(String quizType) {
        this.quizType = quizType;
    }

    public List<Long> getExercises() {
        return exercises;
    }

    public void setExercises(List<Long> exercises) {
        this.exercises = exercises;
    }

    public String getQuizName() {
        return quizName;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Boolean getVisibility() {
        return visibility;
    }

    public void setVisibility(Boolean visibility) {
        this.visibility = visibility;
    }
}
