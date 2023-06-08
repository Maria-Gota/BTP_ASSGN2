package com.example.beconn.dao.helper;

import com.example.beconn.entity.helper.Helper;

import java.util.List;

public interface HelperDao {

    List<Helper> getByCreatedBy(Long createdBy);
    List<Helper> getByCreatedByAndType(Long createdBy , String type);
    Helper getById(Long id);
    void create(Helper helper);
    void deleteById(Long id);
}
