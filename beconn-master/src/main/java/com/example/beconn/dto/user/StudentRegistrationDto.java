package com.example.beconn.dto.user;

import com.example.beconn.entity.user.User;

public class StudentRegistrationDto {

    private User user;

    private String teacherUsername;

    public StudentRegistrationDto() {

    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTeacherUsername() {
        return teacherUsername;
    }

    public void setTeacherUsername(String teacherUsername) {
        this.teacherUsername = teacherUsername;
    }
}
