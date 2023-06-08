package com.example.beconn.dao.notification;

import com.example.beconn.entity.notification.Notification;

import java.util.List;

public interface NotificationDao {

    Notification getById(Long id);
    List<Notification> getByRecipientId(Long recipientId);
    void create(Notification notification);
    void update(Notification notificationDto);
    void deleteById(Long id);
}
