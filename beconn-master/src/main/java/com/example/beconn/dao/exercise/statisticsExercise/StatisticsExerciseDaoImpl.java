package com.example.beconn.dao.exercise.statisticsExercise;

import com.example.beconn.entity.exercise.StatisticsExercise;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class StatisticsExerciseDaoImpl implements StatisticsExerciseDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public StatisticsExercise getById(Long id) {
        String getById = "SELECT x FROM StatisticsExercise x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);
        StatisticsExercise result = (StatisticsExercise) query.getSingleResult();
        return result;
    }

    @Override
    public List<StatisticsExercise> getByCreatedBy(Long createdBy) {
        String getByCreatedBy = "SELECT x FROM StatisticsExercise x WHERE x.createdBy =: createdBy";
        Query query = entityManager.createQuery(getByCreatedBy);
        query.setParameter("createdBy", createdBy);

        List<StatisticsExercise> result = query.getResultList();
        return result;
    }

    @Override
    public List<StatisticsExercise> getByCreatedByAndPurpose(Long createdBy, String purpose) {

        String getByCreatedByAndPurpose = "SELECT x FROM StatisticsExercise x WHERE x.createdBy =: createdBy AND x.purpose =: purpose";
        Query query = entityManager.createQuery(getByCreatedByAndPurpose);
        query.setParameter("createdBy", createdBy);
        query.setParameter("purpose", purpose);

        List<StatisticsExercise> result = query.getResultList();
        return result;
    }

    @Override

    public Map<String, List<StatisticsExercise>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {
        String getSolved = "SELECT x FROM StatisticsExercise x WHERE x.createdBy =: createdBy AND x.purpose = 'PRACTICE' AND x.id IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query solvedQuery = entityManager.createQuery(getSolved);
        solvedQuery.setParameter("createdBy", createdBy);
        solvedQuery.setParameter("studentId", studentId);
        List<StatisticsExercise> solvedList = solvedQuery.getResultList();

        String getNotSolved = "SELECT x FROM StatisticsExercise x WHERE x.createdBy =: createdBy AND x.purpose = 'PRACTICE' AND x.id NOT IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query notSolvedQuery = entityManager.createQuery(getNotSolved);
        notSolvedQuery.setParameter("createdBy", createdBy);
        notSolvedQuery.setParameter("studentId", studentId);
        List<StatisticsExercise> notSolvedList = notSolvedQuery.getResultList();

        Map<String, List<StatisticsExercise>> result = new HashMap<>();
        result.put("SOLVED", solvedList);
        result.put("NOT SOLVED", notSolvedList);
        return result;
    }

    @Override
    public List<StatisticsExercise> getByCreatedByAndExerciseType(Long createdBy, String exerciseType) {

        String getByCreatedByAndExerciseType = "SELECT x FROM StatisticsExercise x WHERE x.createdBy =: createdBy AND x.exerciseType =: exerciseType";
        Query query = entityManager.createQuery(getByCreatedByAndExerciseType);
        query.setParameter("createdBy", createdBy);
        query.setParameter("exerciseType", exerciseType);

        List<StatisticsExercise> statisticsExerciseList = query.getResultList();
        return statisticsExerciseList;
    }

    @Override
    @Transactional
    public void create(StatisticsExercise statisticsExercise) {

        entityManager.persist(statisticsExercise);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        StatisticsExercise statisticsExercise = getById(id);
        entityManager.remove(statisticsExercise);
    }

    @Override
    @Transactional
    public void deleteByCreatedBy(Long createdBy) {

        List<StatisticsExercise> toDelete = getByCreatedBy(createdBy);
        toDelete.forEach(element -> entityManager.remove(element));
    }
}
