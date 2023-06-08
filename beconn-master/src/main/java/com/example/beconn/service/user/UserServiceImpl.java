package com.example.beconn.service.user;

import com.example.beconn.dao.student.StudentDao;
import com.example.beconn.dao.teacher.TeacherDao;
import com.example.beconn.dao.user.UserDao;
import com.example.beconn.dto.user.StudentRegistrationDto;
import com.example.beconn.entity.user.Student;
import com.example.beconn.entity.user.Teacher;
import com.example.beconn.entity.user.User;
import com.example.beconn.mapper.user.RegistrationMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao dao;

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private TeacherDao teacherDao;


    @Autowired
    private RegistrationMapper registrationMapper;

    @Override
    public List<User> getAll() {
        return dao.getAll();
    }

    @Override
    public User getById(Long id) {
        return dao.getById(id);
    }

    @Override
    public User getByUsername(String username) {
        return dao.getByUsername(username);
    }

    @Override
    public List<User> getByRole(String role) {
        return dao.getByRole(role);
    }

    @Override
    public User getByEmailAddress(String emailAddress) {
        return dao.getByEmailAddress(emailAddress);
    }

    @Override
    @Transactional
    public void create(User user) {
        dao.create(user);
    }

    @Override
    @Transactional
    public void createStudentUser(StudentRegistrationDto dto) {

        // extract user object from dto
        User user = registrationMapper.toUser(dto);

        dao.create(user);

        // retrieve the persisted user object to extract the user id
        String username = user.getUsername();
        user = getByUsername(username);

        Student student = registrationMapper.toStudent(dto);
        student.setUserId(user.getId());

        studentDao.create(student);
    }

    @Override
    @Transactional
    public void createTeacherUser(User user) {


        dao.create(user);
        String username = user.getUsername();
        user = getByUsername(username);

        Teacher teacher = new Teacher();
        teacher.setUserId(user.getId());
        teacherDao.create(teacher);
    }

    @Override
    @Transactional
    public void update(User user) {
        dao.update(user);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        dao.deleteById(id);
    }
}
