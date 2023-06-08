package com.example.beconn.entity.notification;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "recipient_id")
    private Long recipientId;

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "type")
    private String type;

    @Column(name = "dispatch_date")
    private LocalDateTime dispatchDate;

    @Column(name = "viewed")
    private Boolean viewed;

    @Column(name = "date_of_access")
    private LocalDate dateOfAccess;

    @Column(name = "extra_info")
    private String extraInfo;

    public Notification() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(Long recipientId) {
        this.recipientId = recipientId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
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
