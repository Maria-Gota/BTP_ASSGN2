package com.example.beconn.dao.student;

import com.example.beconn.entity.user.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentDaoImpl implements StudentDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Student getById(Long id) {

        String getById = "SELECT x FROM Student x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);
        Student student = (Student) query.getSingleResult();
        return student;
    }

    @Override
    public Student getByUserId(Long userId) {

        String getByUserId = "SELECT x FROM Student x WHERE x.userId =: userId";
        Query query = entityManager.createQuery(getByUserId);
        query.setParameter("userId", userId);
        Student student = (Student) query.getSingleResult();
        return student;
    }

    @Override
    public List<Student> getByTeacherId(Long teacherId) {

        String getByTeacherId = "SELECT x FROM Student x WHERE x.teacherId =: teacherId";
        Query query = entityManager.createQuery(getByTeacherId);
        query.setParameter("teacherId", teacherId);
        List<Student> result = query.getResultList();
        return result;
    }

    @Override
    @Transactional
    public void create(Student student) {

        entityManager.persist(student);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        Student student = getById(id);
        entityManager.remove(student);
    }

    @Override
    @Transactional
    public void deleteByUserId(Long userId) {

        Student student = getByUserId(userId);
        entityManager.remove(student);
    }
}
