package com.example.beconn.dao.user;

import com.example.beconn.dao.student.StudentDao;
import com.example.beconn.dao.teacher.TeacherDao;
import com.example.beconn.entity.user.Student;
import com.example.beconn.entity.user.Teacher;
import com.example.beconn.entity.user.User;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private TeacherDao teacherDao;

    @Override
    public List<User> getAll() {

        String getAll = "SELECT x FROM User x";
        Query query = entityManager.createQuery(getAll);
        List<User> result = query.getResultList();

        return result;
    }

    @Override
    public User getById(Long id) {

        String getById = "SELECT x FROM User x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);
        User result = (User) query.getSingleResult();
        return result;
    }

    @Override
    public User getByUsername(String username) {

        String getByUsername = "SELECT x FROM User x WHERE x.username =: username";
        Query query = entityManager.createQuery(getByUsername);
        query.setParameter("username", username);
        User user = (User) query.getSingleResult();
        return user;
    }

    @Override
    public List<User> getByRole(String role) {

        String getByRole = "SELECT x FROM User x WHERE x.role =: role";
        Query query = entityManager.createQuery(getByRole);
        query.setParameter("role", role);
        List<User> result = query.getResultList();
        return result;
    }

    @Override
    public User getByEmailAddress(String emailAddress) {

        String getByEmailAddress = "SELECT x FROM User x WHERE x.emailAddress =: emailAddress";
        Query query = entityManager.createQuery(getByEmailAddress);
        query.setParameter("emailAddress", emailAddress);
        User result = (User) query.getSingleResult();
        return result;
    }

    @Override
    @Transactional
    public void create(User user) {

        entityManager.persist(user);

        String emailAddress = user.getEmailAddress();

        user = getByEmailAddress(emailAddress);

        Long userId = user.getId();

        if (user.getRole().compareTo("STUDENT") == 0) {
            Student student = new Student();
            student.setUserId(userId);
            studentDao.create(student);
        } else if (user.getRole().compareTo("TEACHER") == 0) {
            Teacher teacher = new Teacher();
            teacher.setUserId(userId);
            teacherDao.create(teacher);
        }
    }

    @Override
    @Transactional
    public void update(User user) {

        entityManager.merge(user);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        User user = getById(id);

        if (user != null) {
            if (user.getRole().compareTo("TEACHER") == 0) {
                teacherDao.deleteByUserId(user.getId());

            } else if (user.getRole().compareTo("STUDENT") == 0) {
                studentDao.deleteByUserId(user.getId());
            }
            entityManager.remove(user);
        }
    }
}
