package com.example.beconn.mapper.quiz;

import com.example.beconn.dao.quizExercise.QuizExerciseDao;
import com.example.beconn.dto.quiz.QuizCreationDto;
import com.example.beconn.dto.quiz.QuizDto;
import com.example.beconn.entity.quiz.Quiz;
import com.example.beconn.dao.exercise.exercise.ExerciseDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class QuizMapper {

    @Autowired
    private QuizExerciseDao quizExerciseDao;

    @Autowired
    private ExerciseDao exerciseDao;

    public QuizDto toDto(Quiz entity) {
        Long id = entity.getId();
        Long createdBy = entity.getCreatedBy();
        String quizType = entity.getQuizType();
        String quizName = entity.getQuizName();
        String difficulty = entity.getDifficulty();
        Boolean studentVisibility = entity.getVisibility();

        List<Object> exercises = new ArrayList<>();


        List<Long> exercisesIds = quizExerciseDao.getExercisesByQuizId(id);

        System.out.println("EXERCISES " + exercisesIds);
        exercisesIds.forEach(exerciseId -> {
            Object exercise = exerciseDao.getById(quizType, exerciseId);
            exercises.add(exercise);
        });

        QuizDto result = new QuizDto(id, createdBy, quizType, exercises, quizName, difficulty, studentVisibility);
        return result;
    }

    public List<QuizDto> toDto(List<Quiz> entityList) {
        List<QuizDto> result = new ArrayList<>();

        entityList.forEach(quiz -> {
            QuizDto dto = toDto(quiz);
            result.add(dto);
        });

        return result;
    }

    public Quiz toEntity(QuizCreationDto dto) {

        Quiz quiz = new Quiz();
        Long createdBy = dto.getCreatedBy();
        String quizType = dto.getQuizType();
        String quizName = dto.getQuizName();
        String difficulty = dto.getDifficulty();
        Boolean studentVisibility = dto.getVisibility();

        quiz.setQuizName(quizName);
        quiz.setQuizType(quizType);
        quiz.setDifficulty(difficulty);
        quiz.setCreatedBy(createdBy);
        quiz.setVisibility(studentVisibility);

        return quiz;
    }
}
