package com.example.beconn.controller;

import com.example.beconn.dto.helper.HelperDto;
import com.example.beconn.entity.helper.Helper;
import com.example.beconn.service.helper.HelperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/helper")
public class HelperController {

    @Autowired
    private HelperService helperService;


    @GetMapping(value = "/getByCreatedByAndType/{createdBy}/{type}")
    public ResponseEntity<?> getByCreatedByAndType(@PathVariable Long createdBy, @PathVariable String type) {
        List<HelperDto> result = helperService.getByCreatedByAndType(createdBy, type);
        return new ResponseEntity<>(result, OK);
    }

    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        HelperDto result = helperService.getById(id);
        return new ResponseEntity<>(result, OK);
    }

    @PostMapping(value = "/post")
    public void post(@RequestBody Helper helper) {
        helperService.create(helper);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {
        helperService.deleteById(id);
    }

}
