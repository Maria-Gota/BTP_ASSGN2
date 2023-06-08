package com.example.beconn.dao.quizExercise;

import com.example.beconn.entity.quiz.quizExercises.QuizExercise;

import java.util.List;

public interface QuizExerciseDao {

    List<QuizExercise> getByQuizId(Long quizId);

    List<QuizExercise> getByExerciseId(Long exerciseId);

    List<Long> getExercisesByQuizId(Long quizId);

    void create(QuizExercise quizExercise);

    void deleteByQuizId(Long quizId);

    void deleteByExerciseId(Long exerciseId);
}
