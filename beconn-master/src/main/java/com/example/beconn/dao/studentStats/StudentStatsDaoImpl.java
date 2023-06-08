package com.example.beconn.dao.studentStats;

import com.example.beconn.entity.studentStats.StudentStats;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentStatsDaoImpl implements StudentStatsDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public StudentStats getById(Long id) {
        String getById = "SELECT x FROM StudentStats x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);
        StudentStats result = (StudentStats) query.getSingleResult();
        return result;
    }

    @Override
    public StudentStats getByStudentId(Long studentId) {
        String getByStudentId = "SELECT x FROM StudentStats x WHERE x.studentId =: studentId";
        Query query = entityManager.createQuery(getByStudentId);
        query.setParameter("studentId", studentId);
        StudentStats result = (StudentStats) query.getSingleResult();
        return result;
    }

    @Override
    public List<StudentStats> getByTeacherId(Long teacherId) {
        String getByTeacherId = "SELECT x FROM StudentStats x WHERE x.studentId IN (SELECT y.id FROM Student y WHERE y.teacherId =: teacherId)";
        Query query = entityManager.createQuery(getByTeacherId);
        query.setParameter("teacherId", teacherId);
        List<StudentStats> studentStatsList = query.getResultList();
        return studentStatsList;
    }

    @Override
    @Transactional
    public void create(StudentStats studentStats) {
        entityManager.persist(studentStats);
    }

    @Override
    @Transactional
    public void update(StudentStats studentStats) {
        entityManager.merge(studentStats);
    }

    @Override
    @Transactional
    public void increaseExerciseSolutionGrant(Long id, Integer no) {
        StudentStats studentStats = getById(id);
        Integer exerciseSolutionGrant = studentStats.getExerciseSolutionGrant();
        Integer effortPoints = studentStats.getEffortPoints();
        studentStats.setExerciseSolutionGrant(exerciseSolutionGrant + no);
        studentStats.setEffortPoints(effortPoints - no * 2);
        entityManager.merge(studentStats);
    }

    @Override
    @Transactional
    public void decreaseExerciseSolutionGrant(Long id) {
        StudentStats studentStats = getById(id);
        Integer exerciseSolutionGrant = studentStats.getExerciseSolutionGrant();
        studentStats.setExerciseSolutionGrant(exerciseSolutionGrant - 1);
        entityManager.merge(studentStats);
    }

    @Override
    @Transactional
    public void increaseQuizTryGrant(Long id, Integer no) {
        StudentStats studentStats = getById(id);
        Integer quizTryGrant = studentStats.getQuizTryGrant();
        Integer effortPoints = studentStats.getEffortPoints();
        studentStats.setQuizTryGrant(quizTryGrant + no);
        studentStats.setEffortPoints(effortPoints - no * 4);
        entityManager.merge(studentStats);
    }

    @Override
    @Transactional
    public void decreaseQuizTryGrant(Long id) {
        StudentStats studentStats = getById(id);
        Integer quizTryGrant = studentStats.getQuizTryGrant();
        studentStats.setQuizTryGrant(quizTryGrant - 1);
        entityManager.merge(studentStats);
    }
}
