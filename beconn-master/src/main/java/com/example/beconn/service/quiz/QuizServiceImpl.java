package com.example.beconn.service.quiz;

import com.example.beconn.dao.quiz.QuizDao;
import com.example.beconn.dao.quizExercise.QuizExerciseDao;
import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.dto.quiz.QuizCreationDto;
import com.example.beconn.dto.quiz.QuizDto;
import com.example.beconn.entity.quiz.Quiz;
import com.example.beconn.entity.quiz.quizExercises.QuizExercise;
import com.example.beconn.mapper.quiz.QuizMapper;
import com.example.beconn.service.notification.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizDao dao;

    @Autowired
    private QuizMapper mapper;

    @Autowired
    private QuizExerciseDao quizExerciseDao;

    @Autowired
    private NotificationService notificationService;

    @Override
    public QuizDto getById(Long id) {

        Quiz quiz = dao.getById(id);
        QuizDto dto = mapper.toDto(quiz);
        return dto;
    }

    @Override
    public QuizDto getByName(String name) {

        Quiz quiz = dao.getByName(name);
        QuizDto dto = mapper.toDto(quiz);
        return dto;
    }

    @Override
    public List<QuizDto> getByCreatedBy(Long createdBy) {
        List<Quiz> quizList = dao.getByCreatedBy(createdBy);
        List<QuizDto> quizDtoList = mapper.toDto(quizList);
        return quizDtoList;
    }

    @Override
    public List<QuizDto> getByCreatedByAndQuizType(Long createdBy, String quizType) {

        List<Quiz> quizList = dao.getByCreatedByAndQuizType(createdBy, quizType);
        List<QuizDto> quizDtoList = mapper.toDto(quizList);
        return quizDtoList;
    }

    @Override
    public List<QuizDto> getByCreatedByAndQuizTypeAndVisibility(Long createdBy, String quizType) {

        List<Quiz> quizList = dao.getByCreatedByAndQuizTypeAndVisibility(createdBy, quizType);
        List<QuizDto> quizDtoList = mapper.toDto(quizList);
        return quizDtoList;
    }

    @Override
    @Transactional
    public void create(QuizCreationDto quizDto) {

        Quiz quiz = mapper.toEntity(quizDto);

        dao.create(quiz);

        Long id = getByName(quizDto.getQuizName()).getId();

        List<Long> exerciseIds = quizDto.getExercises();

        // create a quiz exercise entry for each exercise id
        exerciseIds.forEach(exerciseId -> {
            QuizExercise quizExercise = new QuizExercise();
            quizExercise.setQuizId(id);
            quizExercise.setExerciseId(exerciseId);
            quizExerciseDao.create(quizExercise);
        });

        notificationService.create(new NotificationCreationDto(quiz.getCreatedBy(), "NEW_QUIZ", LocalDateTime.now(), quiz.getQuizType()));

    }

    @Override
    @Transactional
    public void updateVisibility(Long quizId) {

        dao.updateVisibility(quizId);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        dao.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteByCreatedBy(Long createdBy) {

        dao.deleteByCreatedBy(createdBy);
    }
}
