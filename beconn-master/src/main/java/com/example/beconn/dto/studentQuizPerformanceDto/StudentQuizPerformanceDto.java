package com.example.beconn.dto.studentQuizPerformanceDto;

import com.example.beconn.dto.quiz.QuizDto;
import com.example.beconn.dto.studentQuiz.StudentQuizDto;

import java.util.List;

public class StudentQuizPerformanceDto {

    private List<StudentQuizDto> studentQuizList;

    private List<QuizDto> quizList;

    public StudentQuizPerformanceDto() {
    }

    public StudentQuizPerformanceDto(List<StudentQuizDto> studentQuizList, List<QuizDto> quizList) {
        this.studentQuizList = studentQuizList;
        this.quizList = quizList;
    }

    public List<StudentQuizDto> getStudentQuizList() {
        return studentQuizList;
    }

    public void setStudentQuizList(List<StudentQuizDto> studentQuizList) {
        this.studentQuizList = studentQuizList;
    }

    public List<QuizDto> getQuizList() {
        return quizList;
    }

    public void setQuizList(List<QuizDto> quizList) {
        this.quizList = quizList;
    }
}
