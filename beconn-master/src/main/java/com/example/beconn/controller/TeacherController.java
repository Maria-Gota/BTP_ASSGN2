package com.example.beconn.controller;


import com.example.beconn.dao.teacher.TeacherDao;
import com.example.beconn.entity.user.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/teachers")
public class TeacherController {

    @Autowired
    private TeacherDao teacherDao;

    @GetMapping(value = "?id={id}")
    public ResponseEntity<Teacher> getById(@PathVariable Long id) {
        Teacher teacher = teacherDao.getById(id);
        return new ResponseEntity<>(teacher, OK);
    }

    @GetMapping(value = "?userId={userId}")
    public ResponseEntity<Teacher> getByUserId(@PathVariable Long userId) {
        Teacher teacher = teacherDao.getByUserId(userId);
        return new ResponseEntity<>(teacher, OK);
    }

    @DeleteMapping(value = "?id={id}")
    public ResponseEntity<Teacher> deleteById(@PathVariable Long id) {
        teacherDao.deleteById(id);
        return new ResponseEntity<>(OK);
    }

    @DeleteMapping(value = "?userId={userId}")
    public ResponseEntity<Teacher> deleteByUserId(@PathVariable Long userId) {
        teacherDao.deleteByUserId(userId);
        return new ResponseEntity<>(OK);
    }
}
