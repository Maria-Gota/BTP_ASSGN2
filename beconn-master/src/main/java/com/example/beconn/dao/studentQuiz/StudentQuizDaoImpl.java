package com.example.beconn.dao.studentQuiz;

import com.example.beconn.entity.studentQuiz.StudentQuiz;
import com.example.beconn.entity.user.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class StudentQuizDaoImpl implements StudentQuizDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public StudentQuiz getById(Long id) {

        String getById = "SELECT x FROM StudentQuiz x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);

        StudentQuiz result = (StudentQuiz) query.getSingleResult();
        return result;
    }

    @Override
    public List<StudentQuiz> getByStudentId(Long studentId) {

        String getByStudentId = "SELECT x FROM StudentQuiz x WHERE x.studentId =: studentId";
        Query query = entityManager.createQuery(getByStudentId);
        query.setParameter("studentId", studentId);

        List<StudentQuiz> result = query.getResultList();
        return result;
    }

    @Override
    public List<StudentQuiz> getByQuizId(Long quizId) {

        String getByQuizId = "SELECT x FROM StudentQuiz x WHERE x.quizId =: quizId";
        Query query = entityManager.createQuery(getByQuizId);
        query.setParameter("quizId", quizId);

        List<StudentQuiz> result = query.getResultList();
        return result;
    }

    @Override
    public List<StudentQuiz> getByQuizIdAndSolved(Long quizId, Boolean solved) {

        String getStudents = "SELECT x FROM StudentQuiz x WHERE x.quizId =: quizId AND x.solved =: solved";
        Query query = entityManager.createQuery(getStudents);
        query.setParameter("quizId", quizId);
        query.setParameter("solved", solved);
        List<StudentQuiz> studentQuizList = query.getResultList();
        return studentQuizList;
    }

    @Override
    public List<StudentQuiz> getByStudentIdAndSolved(Long studentId, Boolean solved) {
        String getByStudentIdAndSolved = "SELECT x FROM StudentQuiz x WHERE x.studentId =: studentId AND x.solved =: solved";
        Query query = entityManager.createQuery(getByStudentIdAndSolved);
        query.setParameter("studentId", studentId);
        query.setParameter("solved", solved);
        List<StudentQuiz> studentQuizList = query.getResultList();
        return studentQuizList;
    }

    @Override
    public List<Student> getStudentsThatDidNotSolveByQuizId(Long quizId, Long teacherId) {

        String getStudents = "SELECT x FROM Student x WHERE x.teacherId =: teacherId AND (x.id NOT IN (SELECT y.studentId FROM StudentQuiz y WHERE y.quizId =: quizId AND y.solved = true) OR " +
                "x.id IN (SELECT z.studentId FROM StudentQuiz z WHERE z.quizId =: quizId AND z.solved = false))";
        Query query = entityManager.createQuery(getStudents);
        query.setParameter("quizId", quizId);
        query.setParameter("teacherId", teacherId);
        List<Student> studentList = query.getResultList();
        return studentList;
    }

    @Override
    public StudentQuiz getByStudentIdAndQuizId(Long studentId, Long quizId) {

        try {
            String getByStudentIdAndQuizId = "SELECT x FROM StudentQuiz x WHERE x.studentId =: studentId AND x.quizId =: quizId";
            Query query = entityManager.createQuery(getByStudentIdAndQuizId);
            query.setParameter("studentId", studentId);
            query.setParameter("quizId", quizId);


            StudentQuiz studentQuiz = (StudentQuiz) query.getSingleResult();
            return studentQuiz;
        } catch (NoResultException x) {
            return null;
        }
    }

    @Override
    @Transactional
    public void create(StudentQuiz studentQuiz) {

        entityManager.persist(studentQuiz);
    }

    @Override
    @Transactional
    public void decreaseTriesLeft(Long id) {
        StudentQuiz studentQuiz = getById(id);
        Integer triesLeft = studentQuiz.getTriesLeft();
        Integer timesAccessed = studentQuiz.getTimesAccessed();
        if (triesLeft - 1 >= 0) {
            studentQuiz.setTriesLeft(triesLeft - 1);
            studentQuiz.setTimesAccessed(timesAccessed + 1);
            studentQuiz.setLastAccessed(LocalDateTime.now());
            entityManager.merge(studentQuiz);
        }
    }

    @Override
    @Transactional
    public void update(StudentQuiz studentQuiz) {
        entityManager.merge(studentQuiz);
    }

    @Override
    @Transactional
    public void updateTriesLeft(Long id, Integer triesLeft) {

        StudentQuiz studentQuiz = getById(id);
        Integer studentQuizTriesLeft = studentQuiz.getTriesLeft();
        studentQuiz.setTriesLeft(studentQuizTriesLeft + triesLeft);
        entityManager.merge(studentQuiz);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        StudentQuiz studentQuiz = getById(id);
        entityManager.remove(studentQuiz);

    }

    @Override
    @Transactional
    public void deleteByStudentIdAndQuizId(Long studentId, Long quizId) {

        StudentQuiz studentQuiz = getByStudentIdAndQuizId(studentId, quizId);
        entityManager.remove(studentQuiz);
    }
}
