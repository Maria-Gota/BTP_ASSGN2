package com.example.beconn.dao.quizExercise;

import com.example.beconn.entity.quiz.quizExercises.QuizExercise;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizExerciseDaoImpl implements QuizExerciseDao {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<QuizExercise> getByQuizId(Long quizId) {

        String getByQuizId = "SELECT x FROM QuizExercise x WHERE x.quizId =: quizId";
        Query query = entityManager.createQuery(getByQuizId);
        query.setParameter("quizId", quizId);

        List<QuizExercise> result = query.getResultList();
        return result;
    }

    @Override
    public List<QuizExercise> getByExerciseId(Long exerciseId) {

        String getByExerciseId = "SELECT x FROM QuizExercise x WHERE x.exerciseId =: exerciseId";
        Query query = entityManager.createQuery(getByExerciseId);
        query.setParameter("exerciseId", exerciseId);

        List<QuizExercise> result = query.getResultList();
        return result;
    }

    @Override
    public List<Long> getExercisesByQuizId(Long quizId) {

        System.out.println("QUIZ ID: " + quizId);
        String getExercisesByQuizId = "SELECT x.exerciseId FROM QuizExercise x WHERE x.quizId =: quizId";
        Query query = entityManager.createQuery(getExercisesByQuizId);
        query.setParameter("quizId", quizId);

        List<Long> result = query.getResultList();

        return result;
    }

    @Override
    @Transactional
    public void create(QuizExercise quizExercise) {

        entityManager.persist(quizExercise);
    }

    @Override
    @Transactional
    public void deleteByQuizId(Long quizId) {

        List<QuizExercise> quizExercises = getByQuizId(quizId);

        quizExercises.forEach(exercise -> {
            entityManager.remove(exercise);
        });
    }

    @Override
    @Transactional
    public void deleteByExerciseId(Long exerciseId) {

        List<QuizExercise> quizExercises = getByExerciseId(exerciseId);

        quizExercises.forEach(exercise -> {
            entityManager.remove(exercise);
        });
    }
}
