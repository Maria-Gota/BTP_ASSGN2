package com.example.beconn.dto.exercise;

import java.util.List;

public class MultipleChoiceExerciseDto {

    private Long id;

    private Long createdBy;

    private String question;

    private List<String> choices;

    private String correctChoice;

    private String purpose;

    public MultipleChoiceExerciseDto() {
    }

    public MultipleChoiceExerciseDto(Long id, Long createdBy, String question, List<String> choices, String correctChoice, String purpose) {
        this.id = id;
        this.createdBy = createdBy;
        this.question = question;
        this.choices = choices;
        this.correctChoice = correctChoice;
        this.purpose = purpose;
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

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getChoices() {
        return choices;
    }

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }

    public String getCorrectChoice() {
        return correctChoice;
    }

    public void setCorrectChoice(String correctChoice) {
        this.correctChoice = correctChoice;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
}
