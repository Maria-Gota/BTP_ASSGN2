package com.example.beconn.service.helper;

import com.example.beconn.dao.helper.HelperDao;
import com.example.beconn.dto.helper.HelperDto;
import com.example.beconn.dto.notification.NotificationCreationDto;
import com.example.beconn.entity.helper.Helper;
import com.example.beconn.mapper.helper.HelperMapper;
import com.example.beconn.service.notification.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HelperServiceImpl implements HelperService {

    @Autowired
    private HelperDao dao;

    @Autowired
    private HelperMapper mapper;

    @Autowired
    private NotificationService notificationService;

    @Override
    public List<HelperDto> getByCreatedBy(Long createdBy) {

        List<Helper> helper = dao.getByCreatedBy(createdBy);
        List<HelperDto> dto = mapper.toDto(helper);
        return dto;
    }

    @Override
    public List<HelperDto> getByCreatedByAndType(Long createdBy, String type) {

        List<Helper> helperList = dao.getByCreatedByAndType(createdBy, type);
        List<HelperDto> helperDtoList = mapper.toDto(helperList);
        return helperDtoList;
    }

    @Override
    public HelperDto getById(Long id) {
        return null;
    }

    @Override
    @Transactional
    public void create(Helper helper) {

        dao.create(helper);
        notificationService.create(new NotificationCreationDto(helper.getCreatedBy(),"NEW_HELPER", LocalDateTime.now(),helper.getType()));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        dao.deleteById(id);
    }
}
