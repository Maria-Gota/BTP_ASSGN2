package com.example.beconn.dto.exercise;

import java.util.List;

public class StatisticsExerciseDto {

    private Long id;

    private String question;

    private List<Integer> data;

    private String exerciseType;

    private Long createdBy;

    private String purpose;

    public StatisticsExerciseDto() {
    }

    public StatisticsExerciseDto(Long id, String question, List<Integer> data, String exerciseType, Long createdBy, String purpose) {
        this.id = id;
        this.question = question;
        this.data = data;
        this.exerciseType = exerciseType;
        this.createdBy = createdBy;
        this.purpose = purpose;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<Integer> getData() {
        return data;
    }

    public void setData(List<Integer> data) {
        this.data = data;
    }

    public String getExerciseType() {
        return exerciseType;
    }

    public void setExerciseType(String exerciseType) {
        this.exerciseType = exerciseType;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
}
