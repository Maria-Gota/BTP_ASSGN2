package com.example.beconn.dao.exercise.financialExercise;

import com.example.beconn.entity.exercise.FinancialExercise;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class FinancialExerciseDaoImpl implements FinancialExerciseDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public FinancialExercise getById(Long id) {

        String getById = "SELECT x FROM FinancialExercise x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);

        FinancialExercise result = (FinancialExercise) query.getSingleResult();
        return result;
    }

    @Override
    public Map<String, List<FinancialExercise>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {
        String getSolved = "SELECT x FROM FinancialExercise x WHERE x.createdBy =: createdBy AND x.purpose = 'PRACTICE' AND x.id IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query solvedQuery = entityManager.createQuery(getSolved);
        solvedQuery.setParameter("createdBy", createdBy);
        solvedQuery.setParameter("studentId", studentId);
        List<FinancialExercise> solvedList = solvedQuery.getResultList();

        String getNotSolved = "SELECT x FROM FinancialExercise x WHERE x.createdBy =: createdBy AND x.purpose = 'PRACTICE' AND x.id NOT IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0 )";
        Query notSolvedQuery = entityManager.createQuery(getNotSolved);
        notSolvedQuery.setParameter("createdBy", createdBy);
        notSolvedQuery.setParameter("studentId", studentId);
        List<FinancialExercise> notSolvedList = notSolvedQuery.getResultList();

        Map<String, List<FinancialExercise>> result = new HashMap<>();
        result.put("SOLVED", solvedList);
        result.put("NOT SOLVED", notSolvedList);
        return result;
    }

    @Override
    public List<FinancialExercise> getByCreatedBy(Long createdBy) {

        String getByCreatedBy = "SELECT x FROM FinancialExercise x WHERE x.createdBy =: createdBy";
        Query query = entityManager.createQuery(getByCreatedBy);
        query.setParameter("createdBy", createdBy);

        List<FinancialExercise> result = query.getResultList();
        return result;
    }

    @Override
    public List<FinancialExercise> getByCreatedByAndPurpose(Long createdBy, String purpose) {

        String getByCreatedByAndPurpose = "SELECT x FROM FinancialExercise x WHERE x.createdBy =: createdBy AND x.purpose =: purpose";
        Query query = entityManager.createQuery(getByCreatedByAndPurpose);
        query.setParameter("createdBy", createdBy);
        query.setParameter("purpose", purpose);

        List<FinancialExercise> result = query.getResultList();
        return result;
    }

    @Override
    public List<FinancialExercise> getByCreatedByAndExerciseType(Long createdBy, String exerciseType) {
        String getByCreatedByAndExerciseType = "SELECT x FROM FinancialExercise x WHERE x.createdBy =: createdBy AND x.exerciseType =: exerciseType";
        Query query = entityManager.createQuery(getByCreatedByAndExerciseType);
        query.setParameter("createdBy", createdBy);
        query.setParameter("exerciseType", exerciseType);

        List<FinancialExercise> result = query.getResultList();
        return result;
    }

    @Override
    @Transactional
    public void create(FinancialExercise financialExercise) {

        entityManager.persist(financialExercise);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        FinancialExercise financialExercise = getById(id);
        entityManager.remove(financialExercise);
    }

    @Override
    @Transactional
    public void deleteByCreatedBy(Long createdBy) {

        List<FinancialExercise> financialExerciseList = getByCreatedBy(createdBy);

        financialExerciseList.forEach(financialExercise -> {
            entityManager.remove(financialExercise);
        });
    }
}
