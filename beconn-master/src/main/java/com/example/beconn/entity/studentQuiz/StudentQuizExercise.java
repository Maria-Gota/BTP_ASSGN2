package com.example.beconn.entity.studentQuiz;


import jakarta.persistence.*;

@Entity
@Table(name = "student_quiz_exercise",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_student_quiz_id_exercise_id", columnNames = {"student_quiz_id", "exercise_id"})
        })
public class StudentQuizExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "student_quiz_id")
    private Long studentQuizId;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "exercise_id")
    private Long exerciseId;

    @Column(name = "correct")
    private Boolean correct;


    public StudentQuizExercise() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentQuizId() {
        return studentQuizId;
    }

    public void setStudentQuizId(Long studentQuizId) {
        this.studentQuizId = studentQuizId;
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

    public Boolean getCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }


    @Override
    public String toString() {
        return "StudentQuizExercise{" +
                "id=" + id +
                ", studentQuizId=" + studentQuizId +
                ", studentId=" + studentId +
                ", exerciseId=" + exerciseId +
                ", correct=" + correct +
                '}';
    }
}
