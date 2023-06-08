package com.example.beconn.mapper.user;

import com.example.beconn.dao.teacher.TeacherDao;
import com.example.beconn.dto.user.StudentRegistrationDto;
import com.example.beconn.entity.user.Student;
import com.example.beconn.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RegistrationMapper {

    @Autowired
    private TeacherDao teacherDao;



    public User toUser(StudentRegistrationDto dto) {

        User user = dto.getUser();

        return user;
    }

    public Student toStudent(StudentRegistrationDto dto) {

        Student student = new Student();
        String teacherUsername = dto.getTeacherUsername();

        Long teacherId = teacherDao.getByUsername(teacherUsername).getId();

        student.setTeacherId(teacherId);
        return student;
    }
}
