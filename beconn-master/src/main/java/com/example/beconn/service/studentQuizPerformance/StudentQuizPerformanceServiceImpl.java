package com.example.beconn.service.studentQuizPerformance;

import com.example.beconn.dto.quiz.QuizDto;
import com.example.beconn.dto.studentQuiz.StudentQuizDto;
import com.example.beconn.dto.studentQuizPerformanceDto.StudentQuizPerformanceDto;
import com.example.beconn.service.quiz.QuizService;
import com.example.beconn.service.studentQuiz.StudentQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentQuizPerformanceServiceImpl implements StudentQuizPerformanceService {

    @Autowired
    private StudentQuizService studentQuizService;

    @Autowired
    private QuizService quizService;

    @Override
    public StudentQuizPerformanceDto getByStudentId(Long studentId) {

        List<StudentQuizDto> studentQuizDtoList = studentQuizService.getByStudentIdAndSolved(studentId, true);


        List<QuizDto> quizDtoList = new ArrayList<>();

        studentQuizDtoList.forEach(dto -> {
            QuizDto quizDto = quizService.getById(dto.getQuizId());
            quizDtoList.add(quizDto);
        });

        StudentQuizPerformanceDto result = new StudentQuizPerformanceDto(studentQuizDtoList,quizDtoList);
        return result;
    }
}
