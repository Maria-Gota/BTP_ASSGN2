package com.example.beconn.dao.quiz;

import com.example.beconn.entity.quiz.Quiz;

import java.util.List;

public interface QuizDao {

    Quiz getById(Long id);

    Quiz getByName(String name);

    List<Quiz> getByCreatedBy(Long createdBy);

    List<Quiz> getByCreatedByAndQuizType(Long createdBy, String quizType);

    List<Quiz> getByCreatedByAndQuizTypeAndVisibility(Long createdBy, String quizType);

    void create(Quiz quiz);

    void updateVisibility(Long quizId);

    void deleteById(Long id);

    void deleteByCreatedBy(Long createdBy);
}
