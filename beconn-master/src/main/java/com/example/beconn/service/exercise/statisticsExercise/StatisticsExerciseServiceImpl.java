package com.example.beconn.service.exercise.statisticsExercise;

import com.example.beconn.dao.exercise.statisticsExercise.StatisticsExerciseDao;
import com.example.beconn.dao.notification.NotificationDao;
import com.example.beconn.dto.exercise.StatisticsExerciseDto;
import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.entity.exercise.StatisticsExercise;
import com.example.beconn.mapper.exercise.statisticsExercise.StatisticsExerciseMapper;
import com.example.beconn.service.notification.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticsExerciseServiceImpl implements StatisticsExerciseService {

    @Autowired
    private StatisticsExerciseDao dao;

    @Autowired
    private StatisticsExerciseMapper mapper;

    @Autowired
    private NotificationService notificationService;

    @Override
    public StatisticsExerciseDto getById(Long id) {

        StatisticsExercise statisticsExercise = dao.getById(id);
        StatisticsExerciseDto result = mapper.toDto(statisticsExercise);
        return result;
    }

    @Override
    public List<StatisticsExerciseDto> getByCreatedBy(Long createdBy) {

        List<StatisticsExercise> statisticsExerciseList = dao.getByCreatedBy(createdBy);
        List<StatisticsExerciseDto> result = mapper.toDto(statisticsExerciseList);
        return result;
    }

    @Override
    public List<StatisticsExerciseDto> getByCreatedByAndPurpose(Long createdBy, String purpose) {

        List<StatisticsExercise> statisticsExerciseList = dao.getByCreatedByAndPurpose(createdBy, purpose);
        List<StatisticsExerciseDto> result = mapper.toDto(statisticsExerciseList);
        return result;
    }

    @Override
    public Map<String, List<StatisticsExerciseDto>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {

        Map<String,List<StatisticsExerciseDto>> result = new HashMap<>();
        Map<String,List<StatisticsExercise>> statisticsExercises = dao.getPracticeByCreatedByAndStudentIdGroupBySolved(createdBy,studentId);
        List<StatisticsExerciseDto> solved = mapper.toDto(statisticsExercises.get("SOLVED"));
        List<StatisticsExerciseDto> notSolved = mapper.toDto(statisticsExercises.get("NOT SOLVED"));
        result.put("SOLVED",solved);
        result.put("NOT SOLVED", notSolved);
        return result;
    }

    @Override
    public List<StatisticsExerciseDto> getByCreatedByAndExerciseType(Long createdBy, String exerciseType) {

        List<StatisticsExercise> statisticsExerciseList = dao.getByCreatedByAndExerciseType(createdBy, exerciseType);
        List<StatisticsExerciseDto> result = mapper.toDto(statisticsExerciseList);
        return result;
    }

    @Override
    @Transactional
    public void create(StatisticsExerciseDto statisticsExerciseDto) {
        StatisticsExercise statisticsExercise = mapper.toEntity(statisticsExerciseDto);
        dao.create(statisticsExercise);
        notificationService.create(new NotificationCreationDto(statisticsExercise.getCreatedBy(),"NEW_EXERCISE", LocalDateTime.now(),"Statistics"));

    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        dao.deleteById(id);
    }

    @Override
    public void deleteByCreatedBy(Long createdBy) {
        dao.deleteByCreatedBy(createdBy);
    }
}
