package com.example.beconn.mapper.helper;

import com.example.beconn.dao.formula.FormulaDao;
import com.example.beconn.dto.helper.HelperDto;
import com.example.beconn.entity.Formula;
import com.example.beconn.entity.helper.Helper;
import com.example.beconn.dao.exercise.exercise.ExerciseDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HelperMapper {

    @Autowired
    private ExerciseDao exerciseDao;

    @Autowired
    private FormulaDao formulaDao;

    public HelperDto toDto(Helper entity) {
        Long id = entity.getId();
        String type = entity.getType();
        String name = entity.getName();
        String content = entity.getContent();
        Long exampleId = entity.getExampleId();
        Object example = exampleId == null ? null : exerciseDao.getById(type,exampleId);
        Long formulaId = entity.getFormulaId();
        Formula formula = formulaId == null ? null : formulaDao.getById(formulaId);
        Long createdBy = entity.getCreatedBy();
        String exampleExplanation = entity.getExampleExplanation();

        HelperDto dto = new HelperDto(id,type,name,content,example,formula,createdBy,exampleExplanation);
        return dto;
    }

    public List<HelperDto> toDto(List<Helper> entityList) {
        List<HelperDto> dtoList = new ArrayList<>();

        entityList.forEach(helper -> {
            HelperDto dto = toDto(helper);
            dtoList.add(dto);
        });

        return dtoList;
    }
}
