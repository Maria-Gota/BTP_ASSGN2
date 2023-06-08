package com.example.beconn.dao.exercise.signTableExercise;

import com.example.beconn.entity.exercise.SignTableExercise;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class SignTableExerciseDaoImpl implements SignTableExerciseDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public SignTableExercise getById(Long id) {

        String getById = "SELECT x FROM SignTableExercise x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);
        SignTableExercise result = (SignTableExercise) query.getSingleResult();

        return result;
    }

    @Override
    public List<SignTableExercise> getByFunctionTypeLinearAndCreatedBy(Long createdBy) {

        String getByFunctionTypeLinearAndCreatedBy = "SELECT x FROM SignTableExercise x WHERE x.functionType = 'linear' AND x.createdBy =: createdBy";
        Query query = entityManager.createQuery(getByFunctionTypeLinearAndCreatedBy);
        query.setParameter("createdBy", createdBy);
        List<SignTableExercise> signTableExerciseList = query.getResultList();
        return signTableExerciseList;
    }

    @Override
    public List<SignTableExercise> getByFunctionTypeQuadraticAndCreatedBy(Long createdBy) {
        String getByFunctionTypeQuadraticAndCreatedBy = "SELECT x FROM SignTableExercise x WHERE x.functionType = 'quadratic' AND x.createdBy =: createdBy";
        Query query = entityManager.createQuery(getByFunctionTypeQuadraticAndCreatedBy);
        query.setParameter("createdBy", createdBy);
        List<SignTableExercise> signTableExerciseList = query.getResultList();
        return signTableExerciseList;
    }

    @Override
    public List<SignTableExercise> getByFunctionTypeLinearAndCreatedByAndPurpose(Long createdBy, String purpose) {

        String getByFunctionTypeLinearAndCreatedByAndPurpose = "SELECT x FROM SignTableExercise x WHERE x.functionType = 'linear' AND x.createdBy =: createdBy AND x.purpose =: purpose";
        Query query = entityManager.createQuery(getByFunctionTypeLinearAndCreatedByAndPurpose);
        query.setParameter("createdBy", createdBy);
        query.setParameter("purpose", purpose);
        List<SignTableExercise> signTableExerciseList = query.getResultList();
        return signTableExerciseList;
    }

    @Override
    public List<SignTableExercise> getByFunctionTypeQuadraticAndCreatedByAndPurpose(Long createdBy, String purpose) {

        String getByFunctionTypeQuadraticAndCreatedByAndPurpose = "SELECT x FROM SignTableExercise x WHERE x.functionType = 'quadratic' AND x.createdBy =: createdBy AND x.purpose =: purpose";
        Query query = entityManager.createQuery(getByFunctionTypeQuadraticAndCreatedByAndPurpose);
        query.setParameter("createdBy", createdBy);
        query.setParameter("purpose", purpose);
        List<SignTableExercise> signTableExerciseList = query.getResultList();
        return signTableExerciseList;
    }

    @Override
    public Map<String, List<SignTableExercise>> getPracticeLinearSignTableByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {

        String getSolved = "SELECT x FROM SignTableExercise x WHERE x.createdBy =: createdBy AND x.functionType = 'linear' AND x.purpose = 'PRACTICE' AND x.id IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query solvedQuery = entityManager.createQuery(getSolved);
        solvedQuery.setParameter("createdBy", createdBy);
        solvedQuery.setParameter("studentId", studentId);
        List<SignTableExercise> solvedList = solvedQuery.getResultList();

        String getNotSolved = "SELECT x FROM SignTableExercise x WHERE x.createdBy =: createdBy AND x.functionType = 'linear' AND x.purpose = 'PRACTICE' AND x.id NOT IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query notSolvedQuery = entityManager.createQuery(getNotSolved);
        notSolvedQuery.setParameter("createdBy", createdBy);
        notSolvedQuery.setParameter("studentId", studentId);
        List<SignTableExercise> notSolvedList = notSolvedQuery.getResultList();

        Map<String, List<SignTableExercise>> result = new HashMap<>();
        result.put("SOLVED", solvedList);
        result.put("NOT SOLVED", notSolvedList);
        return result;
    }

    @Override
    public Map<String, List<SignTableExercise>> getPracticeQuadraticSignTableByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {
        String getSolved = "SELECT x FROM SignTableExercise x WHERE x.createdBy =: createdBy AND x.functionType = 'quadratic' AND x.purpose = 'PRACTICE' AND x.id IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query solvedQuery = entityManager.createQuery(getSolved);
        solvedQuery.setParameter("createdBy", createdBy);
        solvedQuery.setParameter("studentId", studentId);
        List<SignTableExercise> solvedList = solvedQuery.getResultList();

        String getNotSolved = "SELECT x FROM SignTableExercise x WHERE x.createdBy =: createdBy AND x.functionType = 'quadratic' AND x.purpose = 'PRACTICE' AND x.id NOT IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query notSolvedQuery = entityManager.createQuery(getNotSolved);
        notSolvedQuery.setParameter("createdBy", createdBy);
        notSolvedQuery.setParameter("studentId", studentId);
        List<SignTableExercise> notSolvedList = notSolvedQuery.getResultList();

        Map<String, List<SignTableExercise>> result = new HashMap<>();
        result.put("SOLVED", solvedList);
        result.put("NOT SOLVED", notSolvedList);
        return result;
    }

    @Override
    @Transactional
    public void create(SignTableExercise exercise) {

        entityManager.persist(exercise);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        SignTableExercise exercise = getById(id);
        entityManager.remove(exercise);
    }
}