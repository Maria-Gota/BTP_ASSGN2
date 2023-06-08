package com.example.beconn.entity.helper;

import jakarta.persistence.*;

@Entity
@Table(name = "helper")
public class Helper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "name")
    private String name;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "content")
    private String content;

    @Column(name = "example_id")
    private Long exampleId;

    @Column(name = "formula_id")
    private Long formulaId;

    @Column(name = "example_explanation")
    private String exampleExplanation;

    public Helper() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getExampleId() {
        return exampleId;
    }

    public void setExampleId(Long exampleId) {
        this.exampleId = exampleId;
    }

    public Long getFormulaId() {
        return formulaId;
    }

    public void setFormulaId(Long formulaId) {
        this.formulaId = formulaId;
    }

    public String getExampleExplanation() {
        return exampleExplanation;
    }

    public void setExampleExplanation(String exampleExplanation) {
        this.exampleExplanation = exampleExplanation;
    }
}
