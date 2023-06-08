package com.example.beconn.dao.teacher;

import com.example.beconn.entity.user.Teacher;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class TeacherDaoImpl implements TeacherDao {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public Teacher getById(Long id) {

        String getById = "SELECT x FROM Teacher x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);
        Teacher teacher = (Teacher) query.getSingleResult();
        return teacher;
    }

    @Override
    public Teacher getByUserId(Long userId) {

        String getByUserId = "SELECT x FROM Teacher x WHERE x.userId =: userId";
        Query query = entityManager.createQuery(getByUserId);
        query.setParameter("userId", userId);
        Teacher teacher = (Teacher) query.getSingleResult();
        return teacher;
    }

    @Override
    public Teacher getByUsername(String username) {

        String getByUsername = "SELECT x FROM Teacher x WHERE x.userId = (SELECT y.id FROM User y WHERE y.username =: username)";
        Query query = entityManager.createQuery(getByUsername);
        query.setParameter("username", username);
        Teacher teacher = (Teacher) query.getSingleResult();
        return teacher;
    }

    @Override
    @Transactional
    public void create(Teacher teacher) {

        entityManager.persist(teacher);
    }

    @Override
    public void deleteById(Long id) {

        Teacher teacher = getById(id);
        entityManager.remove(teacher);
    }

    @Override
    @Transactional
    public void deleteByUserId(Long userId) {

        Teacher teacher = getByUserId(userId);
        entityManager.remove(teacher);
    }
}
