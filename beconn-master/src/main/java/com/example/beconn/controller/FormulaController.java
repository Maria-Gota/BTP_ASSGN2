package com.example.beconn.controller;


import com.example.beconn.dao.formula.FormulaDao;
import com.example.beconn.entity.Formula;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/formula")
public class FormulaController {

    @Autowired
    private FormulaDao formulaDao;


    @GetMapping(value = "/getAll")
    public ResponseEntity<?> getAll() {
        List<Formula> result = formulaDao.getAll();
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        Formula result = formulaDao.getById(id);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByName/{name}")
    public ResponseEntity<?> getByName(@PathVariable String name) {
        Formula result = formulaDao.getByName(name);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getByType/{type}")
    public ResponseEntity<?> getByType(@PathVariable String type) {
        List<Formula> result = formulaDao.getByType(type);
        return new ResponseEntity<>(result, OK);
    }

    @PostMapping(value = "/post")
    public void post(@RequestBody Formula formula) {
        formulaDao.create(formula);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {
        formulaDao.deleteById(id);
    }

    @DeleteMapping(value = "/deleteByName/{name}")
    public void deleteByName(@PathVariable String name) {
        formulaDao.deleteByName(name);
    }

    @DeleteMapping(value = "/deleteByType/{type}")
    public void deleteByType(@PathVariable String type) {
        formulaDao.deleteByType(type);
    }

}
