package com.example.beconn.mapper.student;

import com.example.beconn.dao.studentQuizExercise.StudentQuizExerciseDao;
import com.example.beconn.dto.studentQuiz.StudentQuizDto;
import com.example.beconn.dto.user.StudentDto;
import com.example.beconn.entity.studentQuiz.StudentQuiz;
import com.example.beconn.entity.studentQuiz.StudentQuizExercise;
import com.example.beconn.service.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class StudentQuizMapper {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentQuizExerciseDao studentQuizExerciseDao;


    public StudentQuizDto toDto(StudentQuiz entity) {

        Long id = entity.getId();
        Long quizId = entity.getQuizId();
        Long studentId = entity.getStudentId();

        StudentDto studentDto = studentService.getById(studentId);

        Integer score = entity.getScore();
        Integer triesLeft = entity.getTriesLeft();
        Integer timesAccessed = entity.getTimesAccessed();
        LocalDateTime lastAccessed = entity.getLastAccessed();
        Boolean solved = entity.getSolved();

        List<StudentQuizExercise> exercises = studentQuizExerciseDao.getByStudentQuizId(id);

        StudentQuizDto result = new StudentQuizDto(id,quizId,studentDto,score,triesLeft,timesAccessed,lastAccessed,exercises,solved);

        return result;
    }

    public StudentQuiz toEntity(StudentQuizDto dto) {
        Long id = dto.getId();
        Long quizId = dto.getQuizId();
        Long studentId = dto.getStudentDto().getStudentId();
        Integer score = dto.getScore();
        Integer triesLeft = dto.getTriesLeft();
        Integer timesAccessed = dto.getTimesAccessed();
        LocalDateTime lastAccessed = dto.getLastAccessed();
        Boolean solved = dto.getSolved();

        StudentQuiz studentQuiz = new StudentQuiz();
        studentQuiz.setId(id);
        studentQuiz.setQuizId(quizId);
        studentQuiz.setStudentId(studentId);
        studentQuiz.setScore(score);
        studentQuiz.setTriesLeft(triesLeft);
        studentQuiz.setTimesAccessed(timesAccessed);
        studentQuiz.setLastAccessed(lastAccessed);
        studentQuiz.setSolved(solved);

        return studentQuiz;
    }

    public List<StudentQuizDto> toDto(List<StudentQuiz> entityList) {
        List<StudentQuizDto> result = new ArrayList<>();

        entityList.forEach(studentQuiz -> {
            StudentQuizDto dto = toDto(studentQuiz);
            result.add(dto);
        });

        return result;
    }
}
