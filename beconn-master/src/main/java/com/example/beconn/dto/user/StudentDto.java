package com.example.beconn.dto.user;

public class StudentDto {

    private Long studentId;

    private Long userId;

    private Long teacherId;

    private String username;

    private String firstName;

    private String lastName;

    public StudentDto(Long studentId, Long userId, Long teacherId, String username, String firstName, String lastName) {
        this.studentId = studentId;
        this.userId = userId;
        this.teacherId = teacherId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
