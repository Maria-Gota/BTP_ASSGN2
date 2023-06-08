package com.example.beconn.entity.exercise;

import jakarta.persistence.*;

@Entity
@Table(name = "multiple_choice_exercise")
public class MultipleChoiceExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question")
    private String question;

    @Column(name = "choices")
    private String choices;

    @Column(name = "correct_choice")
    private String correctChoice;

    @Column(name = "purpose")
    private String purpose;

    @Column(name = "created_by")
    private Long createdBy;

    public MultipleChoiceExercise() {
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

    public String getChoices() {
        return choices;
    }

    public void setChoices(String choices) {

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

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }
}
