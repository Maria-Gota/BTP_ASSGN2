package com.example.beconn.entity.exercise;

import jakarta.persistence.*;

@Entity
@Table(name = "probabilities_exercise")
public class ProbabilitiesExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question")
    private String question;

    @Column(name = "favorable_outcomes")
    private int favorableOutcomes;

    @Column(name = "possible_outcomes")
    private int possibleOutcomes;

    @Column(name = "purpose")
    private String purpose;

    @Column(name = "created_by")
    private Long createdBy;

    public ProbabilitiesExercise() {
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

    public int getFavorableOutcomes() {
        return favorableOutcomes;
    }

    public void setFavorableOutcomes(int favorableOutcomes) {
        this.favorableOutcomes = favorableOutcomes;
    }

    public int getPossibleOutcomes() {
        return possibleOutcomes;
    }

    public void setPossibleOutcomes(int possibleOutcomes) {
        this.possibleOutcomes = possibleOutcomes;
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
