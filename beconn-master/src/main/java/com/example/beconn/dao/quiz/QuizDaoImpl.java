package com.example.beconn.dao.quiz;

import com.example.beconn.entity.quiz.Quiz;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@Repository
public class QuizDaoImpl implements QuizDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Quiz getById(Long id) {
        String getById = "SELECT x FROM Quiz x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);
        Quiz quiz = (Quiz) query.getSingleResult();
        return quiz;
    }

    @Override
    public Quiz getByName(String name) {
        String getByName = "SELECT x FROM Quiz x WHERE x.quizName =: name";
        Query query = entityManager.createQuery(getByName);
        query.setParameter("name", name);
        Quiz quiz = (Quiz) query.getSingleResult();
        return quiz;
    }


    @Override
    public List<Quiz> getByCreatedBy(Long createdBy) {
        String getByCreatedBy = "SELECT x FROM Quiz x WHERE x.createdBy =: createdBy";
        Query query = entityManager.createQuery(getByCreatedBy);
        query.setParameter("createdBy", createdBy);

        List<Quiz> result = query.getResultList();
        return result;
    }

    @Override
    public List<Quiz> getByCreatedByAndQuizType(Long createdBy, String quizType) {

        String getByCreatedByAndQuizType = "SELECT x FROM Quiz x WHERE x.createdBy =: createdBy AND x.quizType =: quizType";
        Query query = entityManager.createQuery(getByCreatedByAndQuizType);
        query.setParameter("createdBy", createdBy);
        query.setParameter("quizType", quizType);

        List<Quiz> result = query.getResultList();
        return result;
    }

    @Override
    public List<Quiz> getByCreatedByAndQuizTypeAndVisibility(Long createdBy, String quizType) {

        String getByCreatedByAndQuizTypeAndVisibility = "SELECT x FROM Quiz x WHERE x.createdBy =: createdBy AND x.quizType =: quizType AND x.visibility = true";
        Query query = entityManager.createQuery(getByCreatedByAndQuizTypeAndVisibility);
        query.setParameter("createdBy", createdBy);
        query.setParameter("quizType", quizType);

        List<Quiz> result = query.getResultList();
        return result;
    }

    @Override
    @Transactional
    public void create(Quiz quiz) {

        entityManager.persist(quiz);
    }

    @Override
    @Transactional
    public void updateVisibility(Long quizId) {

        Quiz quiz = getById(quizId);

        if (quiz.getVisibility()) {
            quiz.setVisibility(false);
        } else {
            quiz.setVisibility(true);
        }
        entityManager.merge(quiz);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Quiz quiz = getById(id);
        entityManager.remove(quiz);
    }

    @Override
    @Transactional
    public void deleteByCreatedBy(Long createdBy) {
        List<Quiz> quizList = getByCreatedBy(createdBy);
        quizList.forEach(quiz -> {
            Long id = quiz.getId();
            deleteById(id);
        });
    }
}
