package com.example.beconn.dto.notification;

import java.time.LocalDateTime;

public class NotificationCreationDto {

    private Long senderId;
    private String type;
    private LocalDateTime dispatchDate;
    private String extraInfo;

    public NotificationCreationDto(Long senderId, String type, LocalDateTime dispatchDate, String extraInfo) {
        this.senderId = senderId;
        this.type = type;
        this.dispatchDate = dispatchDate;
        this.extraInfo = extraInfo;
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

    public String getExtraInfo() {
        return extraInfo;
    }

    public void setExtraInfo(String extraInfo) {
        this.extraInfo = extraInfo;
    }

    @Override
    public String toString() {
        return "NotificationCreationDto{" +
                "senderId=" + senderId +
                ", type='" + type + '\'' +
                ", dispatchDate=" + dispatchDate +
                ", extraInfo='" + extraInfo + '\'' +
                '}';
    }
}
