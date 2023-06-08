package com.example.beconn.service.studentPracticeExercise;

import com.example.beconn.dao.studentPracticeExercise.StudentPracticeExerciseDao;
import com.example.beconn.entity.studentPracticeExercise.StudentPracticeExercise;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentPracticeExerciseServiceImpl implements StudentPracticeExerciseService {

    @Autowired
    private StudentPracticeExerciseDao dao;

    @Override
    public StudentPracticeExercise getById(Long id) {
        return dao.getById(id);
    }

    @Override
    public List<StudentPracticeExercise> getByStudentId(Long studentId) {
        return dao.getByStudentId(studentId);
    }

    @Override
    public StudentPracticeExercise getByStudentIdAndExerciseId(Long studentId, Long exerciseId) {
        return dao.getByStudentIdAndExerciseId(studentId, exerciseId);
    }

    @Override
    @Transactional
    public StudentPracticeExercise getByStudentIdAndExerciseIdOrCreate(Long studentId, Long exerciseId) {

        StudentPracticeExercise studentPracticeExercise = dao.getByStudentIdAndExerciseId(studentId, exerciseId);

        System.out.println("FOUND STUDENT DID NOT SOLVE THIS EXERCISE. ");
        if (studentPracticeExercise == null) {
            studentPracticeExercise = new StudentPracticeExercise();
            studentPracticeExercise.setStudentId(studentId);
            studentPracticeExercise.setExerciseId(exerciseId);
            studentPracticeExercise.setTimesSolved(0);
            studentPracticeExercise.setTimesSolvedCorrectly(0);
            studentPracticeExercise.setPoints(0);
            studentPracticeExercise.setExpirationDate(null);
            dao.create(studentPracticeExercise);
        }

        studentPracticeExercise = dao.getByStudentIdAndExerciseId(studentId, exerciseId);

        return studentPracticeExercise;
    }

    @Override
    @Transactional
    public void create(StudentPracticeExercise studentPracticeExercise) {

        dao.create(studentPracticeExercise);
    }

    @Override
    @Transactional
    public void update(StudentPracticeExercise studentPracticeExercise) {
        dao.update(studentPracticeExercise);
    }
}
