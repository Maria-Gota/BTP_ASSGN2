package com.example.beconn.entity.studentQuiz;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "student_quiz",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_student_quiz_student_id_quiz_id", columnNames = {"quiz_id", "student_id"})
        })
public class StudentQuiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quiz_id")
    private Long quizId;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "score")
    private Integer score;

    @Column(name = "tries_left")
    private Integer triesLeft;

    @Column(name = "times_accessed")
    private Integer timesAccessed;

    @Column(name = "last_accessed")
    private LocalDateTime lastAccessed;

    @Column(name = "solved")
    private Boolean solved;

    public StudentQuiz() {
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

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getTriesLeft() {
        return triesLeft;
    }

    public void setTriesLeft(Integer triesLeft) {
        this.triesLeft = triesLeft;
    }

    public Integer getTimesAccessed() {
        return timesAccessed;
    }

    public void setTimesAccessed(Integer timesAccessed) {
        this.timesAccessed = timesAccessed;
    }

    public LocalDateTime getLastAccessed() {
        return lastAccessed;
    }

    public void setLastAccessed(LocalDateTime lastAccessed) {
        this.lastAccessed = lastAccessed;
    }

    public Boolean getSolved() {
        return solved;
    }

    public void setSolved(Boolean solved) {
        this.solved = solved;
    }

    @Override
    public String toString() {
        return "StudentQuiz{" +
                "id=" + id +
                ", quizId=" + quizId +
                ", studentId=" + studentId +
                ", score=" + score +
                ", triesLeft=" + triesLeft +
                ", timesAccessed=" + timesAccessed +
                ", lastAccessed=" + lastAccessed +
                ", solved=" + solved +
                '}';
    }
}
