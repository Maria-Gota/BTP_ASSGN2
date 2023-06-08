package com.example.beconn.dao.studentQuizExercise;

import com.example.beconn.entity.studentQuiz.StudentQuizExercise;

import java.util.List;

public interface StudentQuizExerciseDao {

    StudentQuizExercise getById(Long id);
    List<StudentQuizExercise> getByStudentQuizId(Long studentQuizId);

    List<StudentQuizExercise> getByStudentId(Long studentId);

    List<StudentQuizExercise> getByCorrectTrue();

    void create(StudentQuizExercise studentQuizExercise);

    void update(StudentQuizExercise studentQuizExercise);

    void deleteById(Long id);

}
