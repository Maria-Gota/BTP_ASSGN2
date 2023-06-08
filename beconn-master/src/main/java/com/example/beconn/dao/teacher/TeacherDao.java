package com.example.beconn.dao.teacher;

import com.example.beconn.entity.user.Teacher;

public interface TeacherDao {

    Teacher getById(Long id);

    Teacher getByUserId(Long userId);

    Teacher getByUsername(String username);

    void create(Teacher teacher);

    void deleteById(Long id);

    void deleteByUserId(Long userId);

}
