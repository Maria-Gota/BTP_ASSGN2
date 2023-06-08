package com.example.beconn.service.studentQuiz;

import com.example.beconn.dto.studentQuiz.StudentQuizDto;
import com.example.beconn.dto.user.StudentDto;
import com.example.beconn.entity.studentQuiz.StudentQuizExercise;

import java.util.List;

public interface StudentQuizService {

    StudentQuizDto getById(Long id);

    List<StudentQuizDto> getByStudentId(Long studentId);

    List<StudentQuizDto> getByQuizId(Long quizId);

    List<StudentQuizDto> getByQuizIdAndSolved(Long quizId);

    List<StudentQuizDto> getByStudentIdAndSolved(Long studentId, Boolean solved);

    List<StudentQuizDto> getByQuizIdAndNotSolved(Long quizId);

    List<StudentDto> getStudentsThatDidNotSolveByQuizId(Long quizId, Long teacherId);

    StudentQuizDto getByStudentIdAndQuizId(Long studentId, Long quizId);

    StudentQuizDto getByStudentIdAndQuizIdOrCreate(Long studentId, Long quizId);

    List<StudentQuizExercise> getCorrespondentExercises(Long studentQuizId);

    void create(StudentQuizDto studentQuiz);

    void update(StudentQuizDto studentQuiz);

    void decreaseTriesLeft(Long id);

    void updateTriesLeft(Long id, Integer triesLeft);

    void deleteById(Long id);

    void deleteByStudentIdAndQuizId(Long studentId, Long quizId);
}
