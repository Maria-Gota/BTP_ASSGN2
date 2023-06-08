package com.example.beconn.controller;

import com.example.beconn.dto.notification.NotificationDto;
import com.example.beconn.service.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationService service;

    @GetMapping(value = "/getByRecipientId/{recipientId}")
    public ResponseEntity<?> getByRecipientId(@PathVariable Long recipientId) {

        List<NotificationDto> result = service.getByRecipientId(recipientId);
        return new ResponseEntity<>(result, OK);
    }

    @PutMapping(value = "/update")
    public void update(@RequestBody NotificationDto notification) {

        service.update(notification);
    }
}
