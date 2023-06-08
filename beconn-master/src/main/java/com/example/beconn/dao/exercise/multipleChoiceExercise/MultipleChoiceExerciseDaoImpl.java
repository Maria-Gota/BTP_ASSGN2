package com.example.beconn.dao.exercise.multipleChoiceExercise;

import com.example.beconn.entity.exercise.MultipleChoiceExercise;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class MultipleChoiceExerciseDaoImpl implements MultipleChoiceExerciseDao {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public MultipleChoiceExercise getById(Long id) {
        String getById = "SELECT x FROM MultipleChoiceExercise x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);

        MultipleChoiceExercise exercise = (MultipleChoiceExercise) query.getSingleResult();
        return exercise;
    }

    @Override
    public List<MultipleChoiceExercise> getByCreatedBy(Long createdById) {
        String getByCreatedBy = "SELECT x FROM MultipleChoiceExercise x WHERE x.createdBy =: createdBy";
        Query query = entityManager.createQuery(getByCreatedBy);
        query.setParameter("createdBy", createdById);

        List<MultipleChoiceExercise> multipleChoiceExerciseList = query.getResultList();
        return multipleChoiceExerciseList;
    }

    @Override
    public List<MultipleChoiceExercise> getByCreatedByAndPurpose(Long createdById, String purpose) {

        String getByCreatedByAndPurpose = "SELECT x FROM MultipleChoiceExercise x WHERE x.createdBy =: createdBy AND x.purpose =: purpose";
        Query query = entityManager.createQuery(getByCreatedByAndPurpose);
        query.setParameter("createdBy", createdById);
        query.setParameter("purpose", purpose);

        List<MultipleChoiceExercise> multipleChoiceExerciseList = query.getResultList();
        return multipleChoiceExerciseList;
    }

    @Override
    public Map<String, List<MultipleChoiceExercise>> getPracticeByCreatedByAndStudentIdGroupBySolved(Long createdBy, Long studentId) {

        String getSolved = "SELECT x FROM MultipleChoiceExercise x WHERE x.createdBy =: createdBy AND x.purpose = 'PRACTICE' AND x.id IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query solvedQuery = entityManager.createQuery(getSolved);
        solvedQuery.setParameter("createdBy", createdBy);
        solvedQuery.setParameter("studentId", studentId);
        List<MultipleChoiceExercise> solvedList = solvedQuery.getResultList();

        String getNotSolved = "SELECT x FROM MultipleChoiceExercise x WHERE x.createdBy =: createdBy AND x.purpose = 'PRACTICE' AND x.id NOT IN (SELECT y.exerciseId FROM StudentPracticeExercise y WHERE y.studentId =: studentId AND y.timesSolved > 0)";
        Query notSolvedQuery = entityManager.createQuery(getNotSolved);
        notSolvedQuery.setParameter("createdBy", createdBy);
        notSolvedQuery.setParameter("studentId", studentId);
        List<MultipleChoiceExercise> notSolvedList = notSolvedQuery.getResultList();

        Map<String, List<MultipleChoiceExercise>> result = new HashMap<>();
        result.put("SOLVED", solvedList);
        result.put("NOT SOLVED", notSolvedList);
        return result;
    }

    @Override
    @Transactional
    public void create(MultipleChoiceExercise multipleChoiceExercise) {

        entityManager.persist(multipleChoiceExercise);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        MultipleChoiceExercise exercise = getById(id);
        entityManager.remove(exercise);

    }
}
