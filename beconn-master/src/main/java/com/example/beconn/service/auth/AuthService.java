package com.example.beconn.service.auth;

import com.example.beconn.dto.user.LoginCredentials;
import com.example.beconn.dto.user.StudentRegistrationDto;
import com.example.beconn.dto.user.TeacherRegistrationDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Map;

public interface AuthService {

    Map<String, Object> registerStudent(StudentRegistrationDto dto) throws Exception;

    Map<String, Object> registerTeacher(TeacherRegistrationDto dto) throws Exception;

    Map<String, Object> login(LoginCredentials credentials);

    Map<String, Object> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

}
