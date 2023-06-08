package com.example.beconn.mapper.student;

import com.example.beconn.dao.user.UserDao;
import com.example.beconn.dto.user.StudentDto;
import com.example.beconn.entity.user.Student;
import com.example.beconn.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StudentMapper {

    @Autowired
    private UserDao userDao;


    public StudentDto toDto(Student entity){

        User studentUser = userDao.getById(entity.getUserId());

        Long studentId = entity.getId();
        Long userId = entity.getUserId();
        Long teacherId = entity.getTeacherId();
        String username = studentUser.getUsername();
        String firstName = studentUser.getFirstName();
        String lastName = studentUser.getLastName();

        StudentDto dto = new StudentDto(studentId,userId,teacherId,username,firstName,lastName);
        return dto;
    }

    public List<StudentDto> toDto(List<Student> entityList) {

        List<StudentDto> result = new ArrayList<>();

        entityList.forEach(student -> {
            StudentDto dto = toDto(student);
            result.add(dto);
        });

        return result;
    }

}
