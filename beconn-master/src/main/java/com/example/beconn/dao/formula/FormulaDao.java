package com.example.beconn.dao.formula;

import com.example.beconn.entity.Formula;

import java.util.List;

public interface FormulaDao {

    List<Formula> getAll();
    Formula getById(Long id);

    Formula getByName(String name);

    List<Formula> getByType(String type);

    void create(Formula formula);

    void deleteById(Long id);

    void deleteByName(String name);

    void deleteByType(String type);


}
