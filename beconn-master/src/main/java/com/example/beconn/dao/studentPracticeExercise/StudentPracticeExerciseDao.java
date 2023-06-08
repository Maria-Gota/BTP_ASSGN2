package com.example.beconn.dao.studentPracticeExercise;

import com.example.beconn.entity.studentPracticeExercise.StudentPracticeExercise;

import java.util.List;

public interface StudentPracticeExerciseDao {

    StudentPracticeExercise getById(Long id);

    List<StudentPracticeExercise> getByStudentId(Long studentId);

    void create(StudentPracticeExercise studentPracticeExercise);

    void update(StudentPracticeExercise studentPracticeExercise);

    StudentPracticeExercise getByStudentIdAndExerciseId(Long studentId, Long exerciseId);
}
