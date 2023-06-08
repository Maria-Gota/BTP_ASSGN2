package com.example.beconn.service.exercise.probabilitiesExercise;

import com.example.beconn.dao.exercise.probabilitiesExercise.ProbabilitiesExerciseDao;
import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.entity.exercise.ProbabilitiesExercise;
import com.example.beconn.service.notification.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ProbabilitiesExerciseServiceImpl implements ProbabilitiesExerciseService {

    @Autowired
    private ProbabilitiesExerciseDao dao;

    @Autowired
    private NotificationService notificationService;

    @Override
    public List<ProbabilitiesExercise> getByCreatedBy(Long createdBy) {
        return dao.getByCreatedBy(createdBy);
    }

    @Override
    public List<ProbabilitiesExercise> getByCreatedByAndPurpose(Long createdBy, String purpose) {
        return dao.getByCreatedByAndPurpose(createdBy, purpose);
    }

    @Override
    public Map<String, List<ProbabilitiesExercise>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {
        return dao.getPracticeByCreatedByAndStudentIdGroupBySolved(createdBy, studentId);
    }

    @Override
    public ProbabilitiesExercise getById(Long id) {
        return dao.getById(id);
    }

    @Override
    @Transactional
    public void create(ProbabilitiesExercise probabilitiesExercise) {

        dao.create(probabilitiesExercise);
        notificationService.create(new NotificationCreationDto(probabilitiesExercise.getCreatedBy(),"NEW_EXERCISE", LocalDateTime.now(),"Probabilities"));
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
