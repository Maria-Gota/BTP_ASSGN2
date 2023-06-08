package com.example.beconn.entity.studentPracticeExercise;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "student_practice_exercise",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_student_practice_student_id_exercise_id", columnNames = {"student_id", "exercise_id"})
        })
public class StudentPracticeExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "exercise_id")
    private Long exerciseId;

    @Column(name = "times_solved")
    private Integer timesSolved;

    @Column(name = "times_solved_correctly")
    private Integer timesSolvedCorrectly;

    @Column(name = "points")
    private Integer points;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    public StudentPracticeExercise() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(Long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public Integer getTimesSolved() {
        return timesSolved;
    }

    public void setTimesSolved(Integer timesSolved) {
        this.timesSolved = timesSolved;
    }

    public Integer getTimesSolvedCorrectly() {
        return timesSolvedCorrectly;
    }

    public void setTimesSolvedCorrectly(Integer timesSolvedCorrectly) {
        this.timesSolvedCorrectly = timesSolvedCorrectly;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    @Override
    public String toString() {
        return "StudentPractice{" +
                "id=" + id +
                ", studentId=" + studentId +
                ", exerciseId=" + exerciseId +
                ", timesSolved=" + timesSolved +
                ", timesSolvedCorrectly=" + timesSolvedCorrectly +
                ", points=" + points +
                ", expirationDate=" + expirationDate +
                '}';
    }
}
