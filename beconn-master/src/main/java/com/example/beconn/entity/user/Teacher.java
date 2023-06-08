package com.example.beconn.entity.user;


import jakarta.persistence.*;

@Entity
@Table(name = "teacher", uniqueConstraints = {
        @UniqueConstraint(name = "UQ_user_id", columnNames = {"user_id"})})
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    public Teacher() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
