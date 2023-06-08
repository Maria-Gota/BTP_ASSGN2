package com.example.beconn.entity.quiz;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_quiz_name", columnNames = {"quiz_name"})
        })
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "quiz_type")
    private String quizType;

    @Column(name = "quiz_name")
    private String quizName;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "visibility")
    private Boolean visibility;

    public Quiz() {
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

    public void setVisibility(Boolean studentVisibility) {
        this.visibility = studentVisibility;
    }
}
