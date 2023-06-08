package com.example.beconn.service.helper;

import com.example.beconn.dto.helper.HelperDto;
import com.example.beconn.entity.helper.Helper;

import java.util.List;

public interface HelperService {

    List<HelperDto> getByCreatedBy(Long createdBy);

    List<HelperDto> getByCreatedByAndType(Long createdBy, String type);

    HelperDto getById(Long id);

    void create(Helper helper);

    void deleteById(Long id);
}
