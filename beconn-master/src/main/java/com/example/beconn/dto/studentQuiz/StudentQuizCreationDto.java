package com.example.beconn.dto.studentQuiz;

import java.time.LocalDateTime;

public class StudentQuizCreationDto {

    private Long id;

    private Long quizId;

    private Long studentId;

    private Integer score;

    private Integer triesLeft;

    private Integer timesAccessed;

    private LocalDateTime lastAccessed;

    private Boolean solved;
}
