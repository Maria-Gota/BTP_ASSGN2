package com.example.beconn.service.exercise.financialExercise;

import com.example.beconn.dao.exercise.financialExercise.FinancialExerciseDao;
import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.entity.exercise.FinancialExercise;
import com.example.beconn.service.notification.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class FinancialExerciseServiceImpl implements FinancialExerciseService {

    @Autowired
    private FinancialExerciseDao dao;

    @Autowired
    private NotificationService notificationService;


    @Override
    public FinancialExercise getById(Long id) {
        return dao.getById(id);
    }

    @Override
    public Map<String, List<FinancialExercise>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {
        return dao.getPracticeByCreatedByAndStudentIdGroupBySolved(createdBy, studentId);
    }

    @Override
    public List<FinancialExercise> getByCreatedBy(Long createdBy) {
        return dao.getByCreatedBy(createdBy);
    }

    @Override
    public List<FinancialExercise> getByCreatedByAndPurpose(Long createdBy, String purpose) {
        return dao.getByCreatedByAndPurpose(createdBy, purpose);
    }

    @Override
    public List<FinancialExercise> getByCreatedByAndExerciseType(Long createdBy, String exerciseType) {
        return dao.getByCreatedByAndExerciseType(createdBy,exerciseType);
    }

    @Override
    @Transactional
    public void create(FinancialExercise financialExercise) {

        dao.create(financialExercise);
        notificationService.create(new NotificationCreationDto(financialExercise.getCreatedBy(),"NEW_EXERCISE", LocalDateTime.now(),"financial"));

    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        dao.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteByCreatedBy(Long createdBy) {

        dao.deleteByCreatedBy(createdBy);
    }
}
