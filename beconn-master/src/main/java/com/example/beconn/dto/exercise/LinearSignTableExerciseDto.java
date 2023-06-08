package com.example.beconn.dto.exercise;

public class LinearSignTableExerciseDto {

    private Long id;

    private Long createdBy;

    private String a;

    private String b;

    private String domainLowerBound;

    private String domainUpperBound;

    private String firstIntervalSign;

    private String secondIntervalSign;

    private String purpose;

    public LinearSignTableExerciseDto() {
    }

    public LinearSignTableExerciseDto(Long id, Long createdBy, String a, String b, String domainLowerBound, String domainUpperBound, String firstIntervalSign, String secondIntervalSign, String purpose) {
        this.id = id;
        this.createdBy = createdBy;
        this.a = a;
        this.b = b;
        this.domainLowerBound = domainLowerBound;
        this.domainUpperBound = domainUpperBound;
        this.firstIntervalSign = firstIntervalSign;
        this.secondIntervalSign = secondIntervalSign;
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

    public String getA() {
        return a;
    }

    public void setA(String a) {
        this.a = a;
    }

    public String getB() {
        return b;
    }

    public void setB(String b) {
        this.b = b;
    }

    public String getDomainLowerBound() {
        return domainLowerBound;
    }

    public void setDomainLowerBound(String domainLowerBound) {
        this.domainLowerBound = domainLowerBound;
    }

    public String getDomainUpperBound() {
        return domainUpperBound;
    }

    public void setDomainUpperBound(String domainUpperBound) {
        this.domainUpperBound = domainUpperBound;
    }

    public String getFirstIntervalSign() {
        return firstIntervalSign;
    }

    public void setFirstIntervalSign(String firstIntervalSign) {
        this.firstIntervalSign = firstIntervalSign;
    }

    public String getSecondIntervalSign() {
        return secondIntervalSign;
    }

    public void setSecondIntervalSign(String secondIntervalSign) {
        this.secondIntervalSign = secondIntervalSign;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
}
