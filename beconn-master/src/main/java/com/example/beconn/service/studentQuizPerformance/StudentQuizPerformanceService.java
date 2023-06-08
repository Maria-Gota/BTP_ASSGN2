package com.example.beconn.service.studentQuizPerformance;

import com.example.beconn.dto.studentQuizPerformanceDto.StudentQuizPerformanceDto;

public interface StudentQuizPerformanceService {

    StudentQuizPerformanceDto getByStudentId(Long studentId);

}
