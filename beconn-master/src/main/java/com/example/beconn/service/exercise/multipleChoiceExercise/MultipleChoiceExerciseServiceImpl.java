package com.example.beconn.service.exercise.multipleChoiceExercise;

import com.example.beconn.dao.exercise.multipleChoiceExercise.MultipleChoiceExerciseDao;
import com.example.beconn.dto.exercise.MultipleChoiceExerciseDto;
import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.entity.exercise.MultipleChoiceExercise;
import com.example.beconn.mapper.exercise.multipleChoiceExercise.MultipleChoiceExerciseMapper;
import com.example.beconn.service.notification.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MultipleChoiceExerciseServiceImpl implements MultipleChoiceExerciseService {

    @Autowired
    private MultipleChoiceExerciseDao dao;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private MultipleChoiceExerciseMapper mapper;

    @Override
    public MultipleChoiceExerciseDto getById(Long id) {

        MultipleChoiceExercise exercise = dao.getById(id);
        MultipleChoiceExerciseDto result = mapper.toDto(exercise);
        return result;
    }

    @Override
    public List<MultipleChoiceExerciseDto> getByCreatedBy(Long createdById) {
        List<MultipleChoiceExercise> exerciseList = dao.getByCreatedBy(createdById);
        List<MultipleChoiceExerciseDto> result = mapper.toDto(exerciseList);
        return result;
    }

    @Override
    public List<MultipleChoiceExerciseDto> getByCreatedByAndPurpose(Long createdById, String purpose) {
        List<MultipleChoiceExercise> exerciseList = dao.getByCreatedByAndPurpose(createdById, purpose);
        List<MultipleChoiceExerciseDto> result = mapper.toDto(exerciseList);
        return result;
    }

    @Override
    public Map<String, List<MultipleChoiceExerciseDto>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {

        Map<String, List<MultipleChoiceExercise>> exerciseMap = dao.getPracticeByCreatedByAndStudentIdGroupBySolved(createdBy, studentId);

        List<MultipleChoiceExerciseDto> solved = mapper.toDto(exerciseMap.get("SOLVED"));
        List<MultipleChoiceExerciseDto> notSolved = mapper.toDto(exerciseMap.get("NOT SOLVED"));

        Map<String, List<MultipleChoiceExerciseDto>> result = new HashMap<>();
        result.put("SOLVED", solved);
        result.put("NOT SOLVED", notSolved);
        return result;
    }

    @Override
    @Transactional
    public void create(MultipleChoiceExerciseDto multipleChoiceExercise) {
        MultipleChoiceExercise exercise = mapper.toEntity(multipleChoiceExercise);
        dao.create(exercise);
        notificationService.create(new NotificationCreationDto(multipleChoiceExercise.getCreatedBy(),"NEW_EXERCISE", LocalDateTime.now(),"Multiple choice"));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        dao.deleteById(id);
    }
}
