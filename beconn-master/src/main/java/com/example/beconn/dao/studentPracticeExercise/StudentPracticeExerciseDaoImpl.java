package com.example.beconn.dao.studentPracticeExercise;

import com.example.beconn.entity.studentPracticeExercise.StudentPracticeExercise;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentPracticeExerciseDaoImpl implements StudentPracticeExerciseDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public StudentPracticeExercise getById(Long id) {

        String getById = "SELECT x FROM StudentPracticeExercise x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);
        StudentPracticeExercise result = (StudentPracticeExercise) query.getSingleResult();

        return result;
    }

    @Override
    public List<StudentPracticeExercise> getByStudentId(Long studentId) {

        String getByStudentId = "SELECT x FROM StudentPracticeExercise x WHERE x.studentId =: studentId";
        Query query = entityManager.createQuery(getByStudentId);
        query.setParameter("studentId", studentId);
        List<StudentPracticeExercise> result = query.getResultList();

        return result;
    }

    @Override
    @Transactional
    public void create(StudentPracticeExercise studentPracticeExercise) {
        entityManager.persist(studentPracticeExercise);
    }

    @Override
    @Transactional
    public void update(StudentPracticeExercise studentPracticeExercise) {
        entityManager.merge(studentPracticeExercise);
    }

    @Override
    public StudentPracticeExercise getByStudentIdAndExerciseId(Long studentId, Long exerciseId) {

        try {
            String getByStudentIdAndExerciseId = "SELECT x FROM StudentPracticeExercise x WHERE x.studentId =: studentId AND x.exerciseId =: exerciseId";
            Query query = entityManager.createQuery(getByStudentIdAndExerciseId);
            query.setParameter("studentId", studentId);
            query.setParameter("exerciseId", exerciseId);

            StudentPracticeExercise result = (StudentPracticeExercise) query.getSingleResult();
            return result;
        } catch (NoResultException x) {
            return null;
        }
    }
}
