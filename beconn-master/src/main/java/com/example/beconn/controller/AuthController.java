package com.example.beconn.controller;

import com.example.beconn.service.auth.AuthService;
import com.example.beconn.dto.user.LoginCredentials;
import com.example.beconn.dto.user.StudentRegistrationDto;
import com.example.beconn.dto.user.TeacherRegistrationDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping(value = "/registerStudent")
    public Map<String, Object> registerStudent(@RequestBody StudentRegistrationDto dto) throws Exception {

        return authService.registerStudent(dto);
    }

    @PostMapping(value = "/registerTeacher")
    public Map<String, Object> registerTeacher(@RequestBody TeacherRegistrationDto dto) throws Exception {

        return authService.registerTeacher(dto);
    }

    @PostMapping(value = "/login")
    public Map<String, Object> login(@RequestBody LoginCredentials credentials) {
        return authService.login(credentials);
    }

    @GetMapping(value = "/refresh")
    public Map<String, Object> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

        return authService.refreshToken(request, response);
    }


}
