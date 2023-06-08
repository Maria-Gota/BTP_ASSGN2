package com.example.beconn.dao.exercise.exercise;

import com.example.beconn.dao.exercise.financialExercise.FinancialExerciseDao;
import com.example.beconn.dao.exercise.probabilitiesExercise.ProbabilitiesExerciseDao;
import com.example.beconn.service.exercise.multipleChoiceExercise.MultipleChoiceExerciseService;
import com.example.beconn.service.exercise.signTableExercise.SignTableService;
import com.example.beconn.service.exercise.statisticsExercise.StatisticsExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ExerciseDaoImpl implements ExerciseDao {

    @Autowired
    private MultipleChoiceExerciseService multipleChoiceExerciseService;

    @Autowired
    private StatisticsExerciseService statisticsExerciseService;

    @Autowired
    private SignTableService signTableService;

    @Autowired
    private ProbabilitiesExerciseDao probabilitiesExerciseDao;

    @Autowired
    private FinancialExerciseDao financialExerciseDao;

    @Override
    public Object getById(String type, Long id) {

        return switch (type) {
            case "Linear function sign table" -> signTableService.getLinearById(id);
            case "Quadratic function sign table" -> signTableService.getQuadraticById(id);
            case "Multiple choice" -> multipleChoiceExerciseService.getById(id);
            case "Probabilities" -> probabilitiesExerciseDao.getById(id);
            case "Statistics" -> statisticsExerciseService.getById(id);
            case "Financial" -> financialExerciseDao.getById(id);
            default -> null;
        };
    }

    @Override
    public Object getByCreatedBy(String type, Long createdBy) {

        return switch (type) {
            case "Linear function sign table" -> signTableService.getByFunctionTypeLinearAndCreatedBy(createdBy);
            case "Quadratic function sign table" -> signTableService.getByFunctionTypeQuadraticAndCreatedBy(createdBy);
            case "Multiple choice" -> multipleChoiceExerciseService.getByCreatedBy(createdBy);
            case "Probabilities" -> probabilitiesExerciseDao.getByCreatedBy(createdBy);
            case "Statistics" -> statisticsExerciseService.getByCreatedBy(createdBy);
            case "Financial" -> financialExerciseDao.getByCreatedBy(createdBy);
            default -> null;
        };
    }
}
