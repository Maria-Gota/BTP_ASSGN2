package com.example.beconn.controller;

import com.example.beconn.entity.user.User;
import com.example.beconn.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll() {
        List<User> users = userService.getAll();
        return new ResponseEntity<>(users, OK);
    }

    @GetMapping(value = "/{id}/id")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        User user = userService.getById(id);
        return new ResponseEntity<>(user, OK);

    }

    @GetMapping(value = "/{emailAddress}/emailAddress")
    public ResponseEntity<User> getByEmailAddress(@PathVariable String emailAddress) {
        User user = userService.getByEmailAddress(emailAddress);
        return new ResponseEntity<>(user, OK);
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) throws Exception {
        System.out.println(user);
        userService.create(user);
        return new ResponseEntity<>(OK);
    }

    @PutMapping
    public ResponseEntity<User> update(@RequestBody User user) throws Exception {
        userService.update(user);
        return new ResponseEntity<>(OK);
    }

    @DeleteMapping
    public ResponseEntity<User> deleteById(@RequestParam Long id) {
        userService.deleteById(id);
        return new ResponseEntity<>(OK);
    }


}
