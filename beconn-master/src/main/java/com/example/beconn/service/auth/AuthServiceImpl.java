package com.example.beconn.service.auth;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.beconn.dao.student.StudentDao;
import com.example.beconn.dao.teacher.TeacherDao;
import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.dto.user.LoginCredentials;
import com.example.beconn.dto.user.StudentRegistrationDto;
import com.example.beconn.dto.user.TeacherRegistrationDto;
import com.example.beconn.entity.user.Student;
import com.example.beconn.entity.user.Teacher;
import com.example.beconn.entity.user.User;
import com.example.beconn.security.CustomUserDetailsService;
import com.example.beconn.security.JwtUtil;
import com.example.beconn.service.notification.NotificationService;
import com.example.beconn.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    @Transactional
    public Map<String, Object> registerStudent(StudentRegistrationDto dto) {

        // replacing the password received with its encoded version to be saved in the database
        String rawPassword = dto.getUser().getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        User user = dto.getUser();
        user.setPassword(encodedPassword);

        dto.setUser(user);
        userService.createStudentUser(dto);

        String username = user.getUsername();

        user = userService.getByUsername(username);
        Long id = user.getId();

        Student student = studentDao.getByUserId(id);
        Long studentId = student.getId();
        Long teacherId = student.getTeacherId();
        notificationService.create(new NotificationCreationDto(studentId, "STUDENT_ENROLLMENT", LocalDateTime.now(), ""));

        String accessToken = jwtUtil.generateAccessToken(username);
        String refreshToken = jwtUtil.generateRefreshToken(username);
        Map<String, Object> response = new HashMap<>();

        response.put("accessToken", accessToken);
        response.put("refreshToken", refreshToken);
        response.put("username", username);
        response.put("role", "STUDENT");
        response.put("userId", id);
        response.put("otherId", studentId);
        response.put("teacherId", teacherId);

        return response;
    }

    @Override
    @Transactional
    public Map<String, Object> registerTeacher(TeacherRegistrationDto dto) throws Exception {

        User user = dto.getUser();
        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);
        userService.createTeacherUser(user);

        String username = user.getUsername();
        user = userService.getByUsername(username);
        Long id = user.getId();

        Teacher teacher = teacherDao.getByUserId(id);
        Long teacherId = teacher.getId();

        String accessToken = jwtUtil.generateAccessToken(username);
        String refreshToken = jwtUtil.generateRefreshToken(username);

        Map<String, Object> response = new HashMap<>();

        response.put("accessToken", accessToken);
        response.put("refreshToken", refreshToken);
        response.put("username", username);
        response.put("role", "TEACHER");
        response.put("userId", id);
        response.put("otherId", teacherId);

        return response;
    }

    @Override
    public Map<String, Object> login(LoginCredentials credentials) {

        String username = credentials.getUsername();
        User allegedUser = userService.getByUsername(username);

        if (!passwordEncoder.matches(credentials.getPassword(), allegedUser.getPassword())) {

            throw new RuntimeException("INVALID PASSWORD");

        } else {

            try {

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword());

                authenticationManager.authenticate(authenticationToken);

                String accessToken = jwtUtil.generateAccessToken(credentials.getUsername());
                String refreshToken = jwtUtil.generateRefreshToken(credentials.getUsername());

                Map<String, Object> response = new HashMap<>();

                User user = userService.getByUsername(credentials.getUsername());
                String role = user.getRole();
                Long userId = user.getId();

                response.put("accessToken", accessToken);
                response.put("refreshToken", refreshToken);
                response.put("username", credentials.getUsername());
                response.put("role", role);


                if (role.compareTo("STUDENT") == 0) {

                    Student student = studentDao.getByUserId(userId);
                    Long studentId = student.getId();
                    Long teacherId = student.getTeacherId();
                    response.put("otherId", studentId);
                    response.put("teacherId", teacherId);

                } else if (role.compareTo("TEACHER") == 0) {

                    Teacher teacher = teacherDao.getByUserId(userId);
                    Long teacherId = teacher.getId();
                    response.put("otherId", teacherId);
                }

                response.put("userId", userId);

                return response;

            } catch (Exception x) {
                throw new RuntimeException("INVALID CREDENTIALS");
            }
        }
    }

    @Override
    public Map<String, Object> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String refreshToken = authHeader.substring(7);

            if (refreshToken.isEmpty()) {

                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "\n\n\nINVALID TOKEN IN BEARER HEADER\n\n\n");

            } else {

                try {

                    String username = jwtUtil.validateTokenRetrieveSubject(refreshToken);

                    String accessToken = jwtUtil.generateAccessToken(username);

                    User user = userService.getByUsername(username);
                    Long id = user.getId();
                    String role = user.getRole();


                    Map<String, Object> res = new HashMap<>();

                    res.put("accessToken", accessToken);
                    res.put("refreshToken", refreshToken);
                    res.put("username", username);
                    res.put("userId", id);
                    res.put("role", role);

                    if (role.compareTo("STUDENT") == 0) {

                        Student student = studentDao.getByUserId(id);
                        Long studentId = student.getId();
                        Long teacherId = student.getTeacherId();
                        res.put("otherId", studentId);
                        res.put("teacherId", teacherId);

                    } else if (role.compareTo("TEACHER") == 0) {

                        Teacher teacher = teacherDao.getByUserId(id);
                        Long teacherId = teacher.getId();
                        res.put("otherId", teacherId);
                    }

                    return res;


                } catch (JWTVerificationException e) {
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "\n\n\nINVALID TOKEN\n\n\n");
                }
            }

        } else {

            throw new RuntimeException("Missing refresh token");
        }
        return null;
    }
}

