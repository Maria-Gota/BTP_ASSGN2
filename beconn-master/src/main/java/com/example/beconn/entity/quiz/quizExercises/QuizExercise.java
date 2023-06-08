package com.example.beconn.entity.quiz.quizExercises;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_exercise")
public class QuizExercise {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quiz_id")
    private Long quizId;

    @Column(name = "exercise_id")
    private Long exerciseId;

    public QuizExercise() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public Long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(Long exercise_id) {
        this.exerciseId = exercise_id;
    }
}
