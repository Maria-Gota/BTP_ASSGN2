package com.example.beconn.dao.studentQuiz;

import com.example.beconn.entity.studentQuiz.StudentQuiz;
import com.example.beconn.entity.user.Student;

import java.util.List;

public interface StudentQuizDao {

    StudentQuiz getById(Long id);

    List<StudentQuiz> getByStudentId(Long studentId);

    List<StudentQuiz> getByQuizId(Long quizId);

    List<StudentQuiz> getByQuizIdAndSolved(Long quizId, Boolean solved);

    List<Student> getStudentsThatDidNotSolveByQuizId(Long quizId, Long teacherId);

    StudentQuiz getByStudentIdAndQuizId(Long studentId, Long quizId);

    List<StudentQuiz> getByStudentIdAndSolved(Long studentId, Boolean solved);

    void create(StudentQuiz studentQuiz);

    void update(StudentQuiz studentQuiz);

    void decreaseTriesLeft(Long id);

    void updateTriesLeft(Long id, Integer triesLeft);

    void deleteById(Long id);

    void deleteByStudentIdAndQuizId(Long studentId, Long quizId);

}
