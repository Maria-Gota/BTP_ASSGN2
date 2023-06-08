package com.example.beconn.dao.exercise.probabilitiesExercise;

import com.example.beconn.entity.exercise.ProbabilitiesExercise;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ProbabilitiesExerciseDaoImpl implements ProbabilitiesExerciseDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ProbabilitiesExercise> getByCreatedBy(Long createdBy) {

        String getByCreatedBy = "SELECT x FROM ProbabilitiesExercise x WHERE x.createdBy =: createdBy";
        Query query = entityManager.createQuery(getByCreatedBy);
        query.setParameter("createdBy", createdBy);
        List<ProbabilitiesExercise> result = query.getResultList();
        return result;
    }

    @Override
    public List<ProbabilitiesExercise> getByCreatedByAndPurpose(Long createdBy, String purpose) {

        String getByCreatedByAndPurpose = "SELECT x FROM ProbabilitiesExercise x WHERE x.createdBy =: createdBy AND x.purpose =: purpose";
        Query query = entityManager.createQuery(getByCreatedByAndPurpose);
        query.setParameter("createdBy", createdBy);
        query.setParameter("purpose", purpose);
        List<ProbabilitiesExercise> result = query.getResultList();
        return result;
    }

    @Override
    public Map<String, List<ProbabilitiesExercise>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {

        String getSolved = "SELECT x FROM ProbabilitiesExercise x WHERE x.createdBy =: createdBy AND x.purpose = 'PRACTICE' AND x.id IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query solvedQuery = entityManager.createQuery(getSolved);
        solvedQuery.setParameter("createdBy", createdBy);
        solvedQuery.setParameter("studentId", studentId);
        List<ProbabilitiesExercise> solvedList = solvedQuery.getResultList();

        String getNotSolved = "SELECT x FROM ProbabilitiesExercise x WHERE x.createdBy =: createdBy AND x.purpose = 'PRACTICE' AND x.id NOT IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query notSolvedQuery = entityManager.createQuery(getNotSolved);
        notSolvedQuery.setParameter("createdBy", createdBy);
        notSolvedQuery.setParameter("studentId", studentId);
        List<ProbabilitiesExercise> notSolvedList = notSolvedQuery.getResultList();

        Map<String, List<ProbabilitiesExercise>> result = new HashMap<>();
        result.put("SOLVED", solvedList);
        result.put("NOT SOLVED", notSolvedList);
        return result;
    }

    @Override
    public ProbabilitiesExercise getById(Long id) {

        System.out.println("TRYING TO RETRIEVE PROBS EX. WITH ID " + id);
        String getById = "SELECT x FROM ProbabilitiesExercise x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);

        ProbabilitiesExercise result = (ProbabilitiesExercise) query.getSingleResult();
        return result;
    }

    @Override
    @Transactional
    public void create(ProbabilitiesExercise probabilitiesExercise) {

        entityManager.persist(probabilitiesExercise);

    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        ProbabilitiesExercise probabilitiesExercise = getById(id);
        entityManager.remove(probabilitiesExercise);
    }

    @Override
    @Transactional
    public void deleteByCreatedBy(Long createdBy) {

        List<ProbabilitiesExercise> probabilities = getByCreatedBy(createdBy);

        probabilities.forEach(probability ->
                entityManager.remove(probability)
        );
    }
}
