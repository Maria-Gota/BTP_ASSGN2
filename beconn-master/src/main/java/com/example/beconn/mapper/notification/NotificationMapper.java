package com.example.beconn.mapper.notification;

import com.example.beconn.dao.student.StudentDao;
import com.example.beconn.dao.teacher.TeacherDao;
import com.example.beconn.dao.user.UserDao;
import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.dto.notification.NotificationDto;
import com.example.beconn.entity.notification.Notification;
import com.example.beconn.entity.user.Student;
import com.example.beconn.entity.user.Teacher;
import com.example.beconn.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class NotificationMapper {

    @Autowired
    private UserDao userDao;

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private TeacherDao teacherDao;


    public Notification toEntity(NotificationDto dto) {

        Long id = dto.getId();
        Long recipientId = dto.getRecipient().getId();
        Long senderId = dto.getSender().getId();
        String type = dto.getType();
        LocalDateTime dispatchDate = dto.getDispatchDate();
        Boolean viewed = dto.getViewed();
        LocalDate dateOfAccess = dto.getDateOfAccess();
        String extraInfo = dto.getExtraInfo();

        Notification notification = new Notification();
        notification.setId(id);
        notification.setRecipientId(recipientId);
        notification.setSenderId(senderId);
        notification.setType(type);
        notification.setDispatchDate(dispatchDate);
        notification.setDateOfAccess(dateOfAccess);
        notification.setViewed(viewed);
        notification.setExtraInfo(extraInfo);
        return notification;
    }
    public List<Notification> toEntity(NotificationCreationDto dto) {

        List<Notification> result = new ArrayList<>();

        Long dtoSenderId = dto.getSenderId();
        Teacher teacher = teacherDao.getById(dtoSenderId);
        Long senderId;

        if(teacher != null) {
            senderId = teacher.getUserId();
        } else {
            Student student = studentDao.getById(dtoSenderId);
            senderId = student.getUserId();
        }

        String type = dto.getType();
        LocalDateTime dispatchDate = dto.getDispatchDate();
        LocalDate dateOfAccess = null;
        Boolean viewed = false;
        String extraInfo = dto.getExtraInfo();

        User sender = userDao.getById(senderId);

        System.out.println("SENDER ID IN NOTIFICATION: " + senderId);
        if(sender.getRole().equals("TEACHER")) {
            List<Student> students = studentDao.getByTeacherId(dtoSenderId);
            students.forEach(student -> {
                Notification notification = new Notification();
                notification.setSenderId(senderId);
                notification.setType(type);
                notification.setDispatchDate(dispatchDate);
                notification.setDateOfAccess(dateOfAccess);
                notification.setViewed(viewed);
                notification.setExtraInfo(extraInfo);

                Long recipientId = student.getUserId();
                notification.setRecipientId(recipientId);
                result.add(notification);

            });
        } else {
            Student student = studentDao.getById(dtoSenderId);
            Long recipientId = teacherDao.getById(student.getTeacherId()).getUserId();
            Notification notification = new Notification();
            notification.setSenderId(senderId);
            notification.setType(type);
            notification.setDispatchDate(dispatchDate);
            notification.setDateOfAccess(dateOfAccess);
            notification.setViewed(viewed);
            notification.setExtraInfo(extraInfo);
            notification.setRecipientId(recipientId);

            result.add(notification);
        }
        return result;
    }

    public NotificationDto toDto(Notification entity) {

        Long id = entity.getId();

        Long recipientId = entity.getRecipientId();
        User recipient = userDao.getById(recipientId);

        Long senderId = entity.getSenderId();
        User sender = userDao.getById(senderId);

        String type = entity.getType();
        LocalDateTime dispatchDate = entity.getDispatchDate();
        LocalDate dateOfAccess = entity.getDateOfAccess();
        Boolean viewed = entity.getViewed();
        String extraInfo = entity.getExtraInfo();
        String title = formulateTitle(type);
        String message = formulateMessage(type,sender,recipient,extraInfo);

        NotificationDto result = new NotificationDto(id,title,message,recipient,sender,type,dispatchDate,viewed,dateOfAccess,extraInfo);
        return result;
    }

    public List<NotificationDto> toDto(List<Notification> entityList) {
        List<NotificationDto> result = new ArrayList<>();

        entityList.forEach(notification -> {
            NotificationDto dto = toDto(notification);
            result.add(dto);
        });
        return result;
    }

    private String formulateTitle(String type) {

        return switch (type) {
            case "STUDENT_ENROLLMENT" -> "Newbie alert";
            case "STUDENT_REQUEST" -> "Just a favor";
            case "NEW_EXERCISE" -> "New stuff";
            case "NEW_QUIZ" -> "New challenge";
            case "NEW_HELPER" -> "New helper";
            case "TEACHER_REQUEST_RESPONSE" -> "Favor response";
            case "RANK_UPGRADE" -> "Up the ladder";
            default -> "";
        };
    }

    private String formulateMessage(String notificationType , User sender , User recipient, Object extraInfo) {

        return switch (notificationType) {
            case "STUDENT_ENROLLMENT" ->
                    String.format("Student %s %s just joined the app, yaay! \uD83E\uDD73", sender.getFirstName(), sender.getLastName());
            case "STUDENT_REQUEST" ->
                    String.format("%s %s would like an extra quiz try. \uD83E\uDD7A \uD83D\uDE4F", sender.getFirstName(), sender.getLastName());
            case "NEW_EXERCISE" ->
                    String.format("%s %s added a new %s exercise. Check it out! \uD83E\uDDD0", sender.getFirstName(), sender.getLastName(), extraInfo);
            case "NEW_QUIZ" ->
                    String.format("%s %s added a new %s quiz. Try it out! \uD83D\uDC7D", sender.getFirstName(), sender.getLastName(), extraInfo);
            case "NEW_HELPER" ->
                    String.format("%s %s added a new %s helper. Check it out! \uD83E\uDDE0", sender.getFirstName(), sender.getLastName(), extraInfo);
            case "TEACHER_REQUEST_RESPONSE" -> "TO DO";
            case "RANK_UPGRADE" ->
                    String.format("You advanced to a new rank: %s. Keep it up! \uD83D\uDE4C", extraInfo);
            default -> "";
        };
    }






}
