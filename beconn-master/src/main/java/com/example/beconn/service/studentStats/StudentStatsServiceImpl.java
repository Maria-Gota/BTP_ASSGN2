package com.example.beconn.service.studentStats;

import com.example.beconn.dao.studentStats.StudentStatsDao;
import com.example.beconn.dto.studentStatsDto.StudentStatsDto;
import com.example.beconn.entity.studentStats.StudentStats;
import com.example.beconn.mapper.student.StudentStatsMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentStatsServiceImpl implements StudentStatsService {

    @Autowired
    private StudentStatsDao dao;

    @Autowired
    private StudentStatsMapper mapper;

    @Override
    public StudentStatsDto getById(Long id) {
        StudentStats studentStats = dao.getById(id);
        StudentStatsDto dto = mapper.toDto(studentStats);
        return dto;
    }

    @Override
    public StudentStatsDto getByStudentId(Long studentId) {
        StudentStats studentStats = dao.getByStudentId(studentId);
        StudentStatsDto dto = mapper.toDto(studentStats);
        return dto;
    }

    @Override
    public List<StudentStatsDto> getByTeacherId(Long teacherId) {
        List<StudentStats> studentStatsList = dao.getByTeacherId(teacherId);
        List<StudentStatsDto> studentStatsDtoList = mapper.toDto(studentStatsList);
        return studentStatsDtoList;
    }

    @Override
    @Transactional
    public void create(StudentStats studentStats) {
        dao.create(studentStats);
    }

    @Override
    @Transactional
    public void update(StudentStats studentStats) {
        dao.update(studentStats);
    }

    @Override
    @Transactional
    public void increaseExerciseSolutionGrant(Long id, Integer no) {
        dao.increaseExerciseSolutionGrant(id, no);
    }

    @Override
    @Transactional
    public void decreaseExerciseSolutionGrant(Long id) {
        dao.decreaseExerciseSolutionGrant(id);
    }

    @Override
    @Transactional
    public void increaseQuizTryGrant(Long id, Integer no) {
        dao.increaseQuizTryGrant(id, no);
    }

    @Override
    @Transactional
    public void decreaseQuizTryGrant(Long id) {
        dao.decreaseQuizTryGrant(id);
    }
}
