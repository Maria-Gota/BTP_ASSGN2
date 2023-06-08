package com.example.beconn.service.studentQuiz;

import com.example.beconn.dao.quizExercise.QuizExerciseDao;
import com.example.beconn.dao.studentQuiz.StudentQuizDao;
import com.example.beconn.dao.studentQuizExercise.StudentQuizExerciseDao;
import com.example.beconn.dto.studentQuiz.StudentQuizDto;
import com.example.beconn.dto.user.StudentDto;
import com.example.beconn.entity.quiz.quizExercises.QuizExercise;
import com.example.beconn.entity.studentQuiz.StudentQuiz;
import com.example.beconn.entity.studentQuiz.StudentQuizExercise;
import com.example.beconn.entity.user.Student;
import com.example.beconn.mapper.student.StudentMapper;
import com.example.beconn.mapper.student.StudentQuizMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudentQuizServiceImpl implements StudentQuizService {

    @Autowired
    private StudentQuizDao dao;

    @Autowired
    private StudentQuizMapper mapper;

    @Autowired
    private StudentQuizExerciseDao studentQuizExerciseDao;

    @Autowired
    private QuizExerciseDao quizExerciseDao;

    @Autowired
    private StudentMapper studentMapper;

    @Override
    public StudentQuizDto getById(Long id) {
        StudentQuiz studentQuiz = dao.getById(id);
        StudentQuizDto dto = mapper.toDto(studentQuiz);
        return dto;
    }

    @Override
    public List<StudentQuizDto> getByStudentId(Long studentId) {
        List<StudentQuiz> studentQuizList = dao.getByStudentId(studentId);
        List<StudentQuizDto> studentQuizDtoList = mapper.toDto(studentQuizList);
        return studentQuizDtoList;
    }

    @Override
    public List<StudentQuizDto> getByQuizId(Long quizId) {
        List<StudentQuiz> studentQuizList = dao.getByQuizId(quizId);
        List<StudentQuizDto> studentQuizDtoList = mapper.toDto(studentQuizList);
        return studentQuizDtoList;
    }

    @Override
    public List<StudentQuizDto> getByQuizIdAndSolved(Long quizId) {
        List<StudentQuiz> studentQuizList = dao.getByQuizIdAndSolved(quizId, true);
        List<StudentQuizDto> studentQuizDtoList = mapper.toDto(studentQuizList);
        return studentQuizDtoList;
    }

    @Override
    public List<StudentQuizDto> getByStudentIdAndSolved(Long studentId, Boolean solved) {
        List<StudentQuiz> studentQuiz = dao.getByStudentIdAndSolved(studentId, solved);
        List<StudentQuizDto> dto = mapper.toDto(studentQuiz);
        return dto;
    }

    @Override
    public List<StudentQuizDto> getByQuizIdAndNotSolved(Long quizId) {
        List<StudentQuiz> studentQuizList = dao.getByQuizIdAndSolved(quizId, false);
        List<StudentQuizDto> studentQuizDtoList = mapper.toDto(studentQuizList);
        return studentQuizDtoList;
    }


    @Override
    public List<StudentDto> getStudentsThatDidNotSolveByQuizId(Long quizId, Long teacherId) {

        List<Student> studentList = dao.getStudentsThatDidNotSolveByQuizId(quizId, teacherId);
        List<StudentDto> studentDtoList = studentMapper.toDto(studentList);
        return studentDtoList;
    }

    @Override
    public StudentQuizDto getByStudentIdAndQuizId(Long studentId, Long quizId) {
        StudentQuiz studentQuiz = dao.getByStudentIdAndQuizId(studentId, quizId);
        StudentQuizDto dto = mapper.toDto(studentQuiz);
        return dto;
    }

    @Override
    @Transactional
    public StudentQuizDto getByStudentIdAndQuizIdOrCreate(Long studentId, Long quizId) {

        // try to retrieve student quiz instance
        StudentQuiz result = dao.getByStudentIdAndQuizId(studentId, quizId);

        // if it is null create it
        if (result == null) {

            System.out.println("EXCEPTION HANDLING IN DAO WORKED ");
            StudentQuiz studentQuiz = new StudentQuiz();
            studentQuiz.setQuizId(quizId);
            studentQuiz.setStudentId(studentId);
            studentQuiz.setScore(0);
            studentQuiz.setSolved(false);
            studentQuiz.setTriesLeft(3);
            studentQuiz.setLastAccessed(null);
            studentQuiz.setTimesAccessed(0);

            dao.create(studentQuiz);

            // retrieve it to use the id for the quiz exercises
            result = dao.getByStudentIdAndQuizId(studentId, quizId);

            Long studentQuizId = result.getId();
            List<QuizExercise> quizExercises = quizExerciseDao.getByQuizId(quizId);


            quizExercises.forEach(quizExercise -> {

                StudentQuizExercise studentQuizExercise = new StudentQuizExercise();
                studentQuizExercise.setStudentQuizId(studentQuizId);
                studentQuizExercise.setExerciseId(quizExercise.getExerciseId());
                studentQuizExercise.setStudentId(studentId);
                studentQuizExercise.setCorrect(false);
                studentQuizExerciseDao.create(studentQuizExercise);
            });
        }

        StudentQuizDto resultDto = getByStudentIdAndQuizId(studentId,quizId);
        return resultDto;
    }

    @Override
    public List<StudentQuizExercise> getCorrespondentExercises(Long studentQuizId) {

        List<StudentQuizExercise> studentQuizExerciseList = studentQuizExerciseDao.getByStudentQuizId(studentQuizId);
        return studentQuizExerciseList;
    }

    @Override
    @Transactional
    public void create(StudentQuizDto studentQuizDto) {


        Long quizId = studentQuizDto.getQuizId();
        StudentDto studentDto = studentQuizDto.getStudentDto();
        StudentQuiz studentQuiz = mapper.toEntity(studentQuizDto);

        dao.create(studentQuiz);


        // retrieve the student quiz id
        studentQuiz = dao.getByStudentIdAndQuizId(studentDto.getStudentId(), quizId);
        Long id = studentQuiz.getId();


        List<QuizExercise> quizExercises = quizExerciseDao.getByQuizId(quizId);

        quizExercises.forEach(quizExercise -> {

            StudentQuizExercise studentQuizExercise = new StudentQuizExercise();
            studentQuizExercise.setStudentQuizId(id);
            studentQuizExercise.setExerciseId(quizExercise.getExerciseId());
            studentQuizExercise.setStudentId(studentDto.getStudentId());
            studentQuizExercise.setCorrect(false);
            studentQuizExerciseDao.create(studentQuizExercise);
        });
    }

    @Override
    @Transactional
    public void update(StudentQuizDto studentQuizDto) {

        StudentQuiz studentQuiz = mapper.toEntity(studentQuizDto);
        studentQuiz.setLastAccessed(LocalDateTime.now());
        List<StudentQuizExercise> exercises = studentQuizDto.getQuizExercises();

        dao.update(studentQuiz);

        exercises.forEach(exercise -> studentQuizExerciseDao.update(exercise));
    }

    @Override
    @Transactional
    public void decreaseTriesLeft(Long id) {

        dao.decreaseTriesLeft(id);
    }

    @Override
    @Transactional
    public void updateTriesLeft(Long id, Integer triesLeft) {

        dao.updateTriesLeft(id, triesLeft);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        dao.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteByStudentIdAndQuizId(Long studentId, Long quizId) {
        dao.deleteByStudentIdAndQuizId(studentId, quizId);
    }
}
