package com.example.beconn.service.studentPracticeExercise;

import com.example.beconn.entity.studentPracticeExercise.StudentPracticeExercise;

import java.util.List;

public interface StudentPracticeExerciseService {

    StudentPracticeExercise getById(Long id);

    List<StudentPracticeExercise> getByStudentId(Long studentId);

    void create(StudentPracticeExercise studentPracticeExercise);

    void update(StudentPracticeExercise studentPracticeExercise);

    StudentPracticeExercise getByStudentIdAndExerciseId(Long studentId, Long exerciseId);

    StudentPracticeExercise getByStudentIdAndExerciseIdOrCreate(Long studentId, Long exerciseId);
}
