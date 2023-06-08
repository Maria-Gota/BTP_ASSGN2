package com.example.beconn.dto.helper;

import com.example.beconn.entity.Formula;

public class HelperDto {

    private Long id;

    private String type;

    private String name;

    private String content;

    private Object example;

    private Formula formula;

    private Long createdBy;

    private String exampleExplanation;

    public HelperDto(Long id, String type, String name, String content, Object example, Formula formula, Long createdBy, String exampleExplanation) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.content = content;
        this.example = example;
        this.formula = formula;
        this.createdBy = createdBy;
        this.exampleExplanation = exampleExplanation;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Object getExample() {
        return example;
    }

    public void setExample(Object example) {
        this.example = example;
    }

    public Formula getFormula() {
        return formula;
    }

    public void setFormula(Formula formula) {
        this.formula = formula;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public String getExampleExplanation() {
        return exampleExplanation;
    }

    public void setExampleExplanation(String exampleExplanation) {
        this.exampleExplanation = exampleExplanation;
    }
}
