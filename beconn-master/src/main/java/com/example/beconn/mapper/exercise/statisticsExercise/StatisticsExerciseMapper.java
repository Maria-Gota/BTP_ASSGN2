package com.example.beconn.mapper.exercise.statisticsExercise;

import com.example.beconn.dto.exercise.StatisticsExerciseDto;
import com.example.beconn.entity.exercise.StatisticsExercise;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class StatisticsExerciseMapper {


    public StatisticsExerciseDto toDto(StatisticsExercise entity) {

        Long id = entity.getId();
        Long createdBy = entity.getCreatedBy();
        String question = entity.getQuestion();
        String exerciseType = entity.getExerciseType();
        String purpose = entity.getPurpose();
        List<Integer> data = new ArrayList<>();
        Arrays.stream(entity.getData().split(","))
                .toList()
                .forEach(el -> data.add(Integer.parseInt(el)));

        StatisticsExerciseDto dto = new StatisticsExerciseDto(id, question, data, exerciseType, createdBy, purpose);
        return dto;
    }

    public List<StatisticsExerciseDto> toDto(List<StatisticsExercise> entityList) {

        List<StatisticsExerciseDto> dtoList = new ArrayList<>();

        entityList.forEach(el -> {
            StatisticsExerciseDto dto = toDto(el);
            dtoList.add(dto);
        });

        return dtoList;
    }

    public StatisticsExercise toEntity(StatisticsExerciseDto dto) {

        Long id = dto.getId();
        Long createdBy = dto.getCreatedBy();
        String question = dto.getQuestion();
        String exerciseType = dto.getExerciseType();
        String purpose = dto.getPurpose();
        List<Integer> dtoData = dto.getData();

        String data = "";

        int length = dtoData.size();

        for (int i = 0; i < length; i++) {

            String stringEl = String.valueOf(dtoData.get(i));
            data = data.concat(stringEl);

            if (i != length - 1) {
                data = data.concat(",");
            }
        }

        StatisticsExercise statisticsExercise = new StatisticsExercise();
        statisticsExercise.setId(id);
        statisticsExercise.setCreatedBy(createdBy);
        statisticsExercise.setQuestion(question);
        statisticsExercise.setExerciseType(exerciseType);
        statisticsExercise.setData(data);
        statisticsExercise.setPurpose(purpose);

        return statisticsExercise;
    }
}


