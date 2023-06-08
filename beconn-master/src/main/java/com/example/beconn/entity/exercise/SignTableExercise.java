package com.example.beconn.entity.exercise;

import jakarta.persistence.*;

@Entity
@Table(name = "sign_table_exercise")
public class SignTableExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "function_type")
    private String functionType;

    @Column(name = "coefficients")
    private String coefficients;

    @Column(name = "domain_bounds")
    private String domainBounds;

    @Column(name = "correct_signs")
    private String correctSigns;

    @Column(name = "solutions")
    private String solutions;

    @Column(name = "purpose")
    private String purpose;
    @Column(name = "created_by")
    private Long createdBy;

    public SignTableExercise() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFunctionType() {
        return functionType;
    }

    public void setFunctionType(String type) {
        this.functionType = type;
    }

    public String getCoefficients() {
        return coefficients;
    }

    public void setCoefficients(String coefficients) {
        this.coefficients = coefficients;
    }

    public String getDomainBounds() {
        return domainBounds;
    }

    public void setDomainBounds(String domainBounds) {
        this.domainBounds = domainBounds;
    }

    public String getCorrectSigns() {
        return correctSigns;
    }

    public void setCorrectSigns(String correctSigns) {
        this.correctSigns = correctSigns;
    }

    public String getSolutions() {
        return solutions;
    }

    public void setSolutions(String solutions) {
        this.solutions = solutions;
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
