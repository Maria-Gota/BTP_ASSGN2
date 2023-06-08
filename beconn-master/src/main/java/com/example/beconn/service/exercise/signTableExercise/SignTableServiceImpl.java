package com.example.beconn.service.exercise.signTableExercise;

import com.example.beconn.dao.exercise.signTableExercise.SignTableExerciseDao;
import com.example.beconn.dto.exercise.LinearSignTableExerciseDto;
import com.example.beconn.dto.exercise.QuadraticSignTableExerciseDto;
import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.entity.exercise.SignTableExercise;
import com.example.beconn.mapper.exercise.signTableExercise.SignTableExerciseMapper;
import com.example.beconn.service.notification.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SignTableServiceImpl implements SignTableService {

    @Autowired
    private SignTableExerciseDao dao;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private SignTableExerciseMapper mapper;


    @Override
    public LinearSignTableExerciseDto getLinearById(Long id) {

        SignTableExercise signTableExercise = dao.getById(id);
        LinearSignTableExerciseDto dto = mapper.toLinearDto(signTableExercise);
        return dto;
    }

    @Override
    public QuadraticSignTableExerciseDto getQuadraticById(Long id) {
        SignTableExercise signTableExercise = dao.getById(id);
        QuadraticSignTableExerciseDto dto = mapper.toQuadraticDto(signTableExercise);
        return dto;
    }

    @Override
    public List<LinearSignTableExerciseDto> getByFunctionTypeLinearAndCreatedBy(Long createdBy) {

        List<SignTableExercise> signTableExercise = dao.getByFunctionTypeLinearAndCreatedBy(createdBy);
        List<LinearSignTableExerciseDto> dto = mapper.toLinearDto(signTableExercise);
        return dto;
    }

    @Override
    public List<QuadraticSignTableExerciseDto> getByFunctionTypeQuadraticAndCreatedBy(Long createdBy) {
        List<SignTableExercise> signTableExerciseList = dao.getByFunctionTypeQuadraticAndCreatedBy(createdBy);
        List<QuadraticSignTableExerciseDto> dtoList = mapper.toQuadraticDto(signTableExerciseList);
        return dtoList;
    }

    @Override
    public List<LinearSignTableExerciseDto> getByFunctionTypeLinearAndCreatedByAndPurpose(Long createdBy, String purpose) {

        List<SignTableExercise> signTableExerciseList = dao.getByFunctionTypeLinearAndCreatedByAndPurpose(createdBy, purpose);
        List<LinearSignTableExerciseDto> dtoList = mapper.toLinearDto(signTableExerciseList);
        return dtoList;
    }

    @Override
    public List<QuadraticSignTableExerciseDto> getByFunctionTypeQuadraticAndCreatedByAndPurpose(Long createdBy, String purpose) {

        List<SignTableExercise> signTableExerciseList = dao.getByFunctionTypeQuadraticAndCreatedByAndPurpose(createdBy, purpose);
        List<QuadraticSignTableExerciseDto> dtoList = mapper.toQuadraticDto(signTableExerciseList);
        return dtoList;
    }

    @Override
    public Map<String, List<LinearSignTableExerciseDto>> getPracticeLinearSignTableByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {

        Map<String, List<SignTableExercise>> signTableExerciseMap = dao.getPracticeLinearSignTableByCreatedByAndStudentIdGroupBySolved(createdBy, studentId);
        List<LinearSignTableExerciseDto> solved = mapper.toLinearDto(signTableExerciseMap.get("SOLVED"));
        List<LinearSignTableExerciseDto> notSolved = mapper.toLinearDto(signTableExerciseMap.get("NOT SOLVED"));

        Map<String, List<LinearSignTableExerciseDto>> linearSignTableDtoMap = new HashMap<>();
        linearSignTableDtoMap.put("SOLVED", solved);
        linearSignTableDtoMap.put("NOT SOLVED", notSolved);
        return linearSignTableDtoMap;
    }

    @Override
    public Map<String, List<QuadraticSignTableExerciseDto>> getPracticeQuadraticSignTableByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {

        Map<String, List<SignTableExercise>> signTableExerciseMap = dao.getPracticeQuadraticSignTableByCreatedByAndStudentIdGroupBySolved(createdBy, studentId);
        List<QuadraticSignTableExerciseDto> solved = mapper.toQuadraticDto(signTableExerciseMap.get("SOLVED"));
        List<QuadraticSignTableExerciseDto> notSolved = mapper.toQuadraticDto(signTableExerciseMap.get("NOT SOLVED"));

        Map<String, List<QuadraticSignTableExerciseDto>> quadraticSignTableDtoMap = new HashMap<>();
        quadraticSignTableDtoMap.put("SOLVED", solved);
        quadraticSignTableDtoMap.put("NOT SOLVED", notSolved);
        return quadraticSignTableDtoMap;
    }

    @Override
    @Transactional
    public void createLinear(LinearSignTableExerciseDto linearSignTableExerciseDto) {
        SignTableExercise exercise = mapper.toEntity(linearSignTableExerciseDto);
        dao.create(exercise);
        notificationService.create(new NotificationCreationDto(linearSignTableExerciseDto.getCreatedBy(), "NEW_EXERCISE", LocalDateTime.now(), "Linear function sign table"));

    }

    @Override
    @Transactional
    public void createQuadratic(QuadraticSignTableExerciseDto quadraticSignTableExerciseDto) {
        SignTableExercise exercise = mapper.toEntity(quadraticSignTableExerciseDto);
        dao.create(exercise);
        notificationService.create(new NotificationCreationDto(quadraticSignTableExerciseDto.getCreatedBy(), "NEW_EXERCISE", LocalDateTime.now(), "Quadratic function sign table"));

    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        dao.deleteById(id);
    }
}
