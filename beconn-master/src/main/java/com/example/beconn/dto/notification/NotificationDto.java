package com.example.beconn.dto.notification;

import com.example.beconn.entity.user.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class NotificationDto {

    private Long id;

    private String title;

    private String message;
    private User recipient;
    private User sender;
    private String type;
    private LocalDateTime dispatchDate;
    private Boolean viewed;
    private LocalDate dateOfAccess;
    private String extraInfo;

    public NotificationDto(Long id, String title, String message, User recipient, User sender, String type, LocalDateTime dispatchDate, Boolean viewed, LocalDate dateOfAccess, String extraInfo) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.recipient = recipient;
        this.sender = sender;
        this.type = type;
        this.dispatchDate = dispatchDate;
        this.viewed = viewed;
        this.dateOfAccess = dateOfAccess;
        this.extraInfo = extraInfo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getRecipient() {
        return recipient;
    }

    public void setRecipient(User recipient) {
        this.recipient = recipient;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getDispatchDate() {
        return dispatchDate;
    }

    public void setDispatchDate(LocalDateTime dispatchDate) {
        this.dispatchDate = dispatchDate;
    }

    public Boolean getViewed() {
        return viewed;
    }

    public void setViewed(Boolean viewed) {
        this.viewed = viewed;
    }

    public LocalDate getDateOfAccess() {
        return dateOfAccess;
    }

    public void setDateOfAccess(LocalDate dateOfAccess) {
        this.dateOfAccess = dateOfAccess;
    }

    public String getExtraInfo() {
        return extraInfo;
    }

    public void setExtraInfo(String extraInfo) {
        this.extraInfo = extraInfo;
    }
}
