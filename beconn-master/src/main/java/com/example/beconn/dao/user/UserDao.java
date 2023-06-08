package com.example.beconn.dao.user;

import com.example.beconn.entity.user.User;

import java.util.List;

public interface UserDao {

    List<User> getAll();

    User getById(Long id);

    User getByUsername(String username);

    List<User> getByRole(String role);

    User getByEmailAddress(String emailAddress);

    void create(User user);

    void update(User user);

    void deleteById(Long id);
}
