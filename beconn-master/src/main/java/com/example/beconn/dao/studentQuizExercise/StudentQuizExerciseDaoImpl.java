package com.example.beconn.dao.studentQuizExercise;

import com.example.beconn.entity.studentQuiz.StudentQuizExercise;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentQuizExerciseDaoImpl implements StudentQuizExerciseDao {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public StudentQuizExercise getById(Long id) {

        String getById = "SELECT x FROM StudentQuizExercise x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id",id);

        StudentQuizExercise result = (StudentQuizExercise) query.getSingleResult();
        return result;
    }

    @Override
    public List<StudentQuizExercise> getByStudentQuizId(Long studentQuizId) {

        String getByStudentQuizId = "SELECT x FROM StudentQuizExercise x WHERE x.studentQuizId =: studentQuizId";
        Query query = entityManager.createQuery(getByStudentQuizId);
        query.setParameter("studentQuizId",studentQuizId);

        List<StudentQuizExercise> result = query.getResultList();
        return result;
    }

    @Override
    public List<StudentQuizExercise> getByStudentId(Long studentId) {

        String getByStudentId = "SELECT x FROM StudentQuizExercise x WHERE x.studentId =: studentId";
        Query query = entityManager.createQuery(getByStudentId);
        query.setParameter("studentId",studentId);

        List<StudentQuizExercise> result = query.getResultList();
        return result;
    }

    @Override
    public List<StudentQuizExercise> getByCorrectTrue() {

        String getByCorrectTrue = "SELECT x FROM StudentQuizExercise x WHERE x.correct = true";
        Query query = entityManager.createQuery(getByCorrectTrue);

        List<StudentQuizExercise> result = query.getResultList();
        return result;
    }

    @Override
    @Transactional
    public void create(StudentQuizExercise studentQuizExercise) {

        entityManager.persist(studentQuizExercise);
    }

    @Override
    @Transactional
    public void update(StudentQuizExercise studentQuizExercise) {

        entityManager.merge(studentQuizExercise);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        StudentQuizExercise studentQuizExercise = getById(id);
        entityManager.remove(studentQuizExercise);
    }
}
