package com.example.beconn.service.notification;

import com.example.beconn.dao.notification.NotificationDao;
import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.dto.notification.NotificationDto;
import com.example.beconn.entity.notification.Notification;
import com.example.beconn.mapper.notification.NotificationMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationMapper mapper;

    @Autowired
    private NotificationDao dao;


    @Override
    public NotificationDto getById(Long id) {
        Notification notification = dao.getById(id);
        NotificationDto result = mapper.toDto(notification);
        return result;
    }

    @Override
    public List<NotificationDto> getByRecipientId(Long recipientId) {

        List<Notification> notificationList = dao.getByRecipientId(recipientId);
        List<NotificationDto> result = mapper.toDto(notificationList);
        return result;
    }

    @Override
    @Transactional
    public void create(NotificationCreationDto notificationCreationDto) {
        List<Notification> notificationList = mapper.toEntity(notificationCreationDto);
        notificationList.forEach(notification -> {
            dao.create(notification);
        });
    }

    @Override
    @Transactional
    public void update(NotificationDto notificationDto) {
        Notification notification = mapper.toEntity(notificationDto);
        dao.update(notification);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        dao.deleteById(id);
    }
}
