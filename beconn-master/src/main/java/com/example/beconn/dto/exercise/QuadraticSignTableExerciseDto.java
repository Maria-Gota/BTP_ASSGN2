package com.example.beconn.dto.exercise;

public class QuadraticSignTableExerciseDto {

    private Long id;

    private Long createdBy;

    private String a;

    private String b;
    private String c;
    private String x1;
    private String x2;

    private String domainLowerBound;

    private String domainUpperBound;

    private String firstIntervalSign;

    private String secondIntervalSign;
    private String thirdIntervalSign;

    private String purpose;


    public QuadraticSignTableExerciseDto(Long id, Long createdBy, String a, String b, String c, String x1, String x2, String domainLowerBound, String domainUpperBound, String firstIntervalSign, String secondIntervalSign, String thirdIntervalSign, String purpose) {
        this.id = id;
        this.createdBy = createdBy;
        this.a = a;
        this.b = b;
        this.c = c;
        this.x1 = x1;
        this.x2 = x2;
        this.domainLowerBound = domainLowerBound;
        this.domainUpperBound = domainUpperBound;
        this.firstIntervalSign = firstIntervalSign;
        this.secondIntervalSign = secondIntervalSign;
        this.thirdIntervalSign = thirdIntervalSign;
        this.purpose = purpose;
    }

    public String getC() {
        return c;
    }

    public void setC(String c) {
        this.c = c;
    }

    public String getX1() {
        return x1;
    }

    public void setX1(String x1) {
        this.x1 = x1;
    }

    public String getX2() {
        return x2;
    }

    public void setX2(String x2) {
        this.x2 = x2;
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

    public String getThirdIntervalSign() {
        return thirdIntervalSign;
    }

    public void setThirdIntervalSign(String thirdIntervalSign) {
        this.thirdIntervalSign = thirdIntervalSign;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    @Override
    public String toString() {
        return "QuadraticSignTableExerciseDto{" +
                "id=" + id +
                ", createdBy=" + createdBy +
                ", a='" + a + '\'' +
                ", b='" + b + '\'' +
                ", c='" + c + '\'' +
                ", x1='" + x1 + '\'' +
                ", x2='" + x2 + '\'' +
                ", domainLowerBound='" + domainLowerBound + '\'' +
                ", domainUpperBound='" + domainUpperBound + '\'' +
                ", firstIntervalSign='" + firstIntervalSign + '\'' +
                ", secondIntervalSign='" + secondIntervalSign + '\'' +
                ", thirdIntervalSign='" + thirdIntervalSign + '\'' +
                ", purpose='" + purpose + '\'' +
                '}';
    }
}
