package com.example.beconn.service.quiz;

import com.example.beconn.dto.quiz.QuizCreationDto;
import com.example.beconn.dto.quiz.QuizDto;

import java.util.List;

public interface QuizService {

    QuizDto getById(Long id);

    QuizDto getByName(String name);

    List<QuizDto> getByCreatedBy(Long createdBy);

    List<QuizDto> getByCreatedByAndQuizType(Long createdBy, String quizType);

    List<QuizDto> getByCreatedByAndQuizTypeAndVisibility(Long createdBy, String quizType);

    void create(QuizCreationDto quiz);

    void updateVisibility(Long quizId);

    void deleteById(Long id);

    void deleteByCreatedBy(Long createdBy);
}
