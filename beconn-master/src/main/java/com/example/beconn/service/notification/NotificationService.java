package com.example.beconn.service.notification;

import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.dto.notification.NotificationDto;

import java.util.List;

public interface NotificationService {

    NotificationDto getById(Long id);

    List<NotificationDto> getByRecipientId(Long recipientId);

    void create(NotificationCreationDto notification);

    void update(NotificationDto notificationDto);

    void deleteById(Long id);
}
