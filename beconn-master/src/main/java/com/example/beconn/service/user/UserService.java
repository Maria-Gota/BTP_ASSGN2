package com.example.beconn.service.user;

import com.example.beconn.dto.user.StudentRegistrationDto;
import com.example.beconn.entity.user.User;

import java.util.List;

public interface UserService {

    List<User> getAll();

    User getById(Long id);

    User getByUsername(String username);

    List<User> getByRole(String role);

    User getByEmailAddress(String emailAddress);

    void create(User user);

    void createStudentUser(StudentRegistrationDto user);

    void createTeacherUser(User user);

    void update(User user);

    void deleteById(Long id);
}
