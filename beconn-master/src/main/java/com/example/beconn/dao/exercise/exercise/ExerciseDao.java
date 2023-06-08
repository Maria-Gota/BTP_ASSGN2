package com.example.beconn.dao.exercise.exercise;


public interface ExerciseDao {

    Object getById(String type, Long id);

    Object getByCreatedBy(String type, Long createdBy);

}
