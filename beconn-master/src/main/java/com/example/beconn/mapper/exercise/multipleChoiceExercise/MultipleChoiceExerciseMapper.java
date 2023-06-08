package com.example.beconn.mapper.exercise.multipleChoiceExercise;

import com.example.beconn.dto.exercise.MultipleChoiceExerciseDto;
import com.example.beconn.entity.exercise.MultipleChoiceExercise;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class MultipleChoiceExerciseMapper {


    public MultipleChoiceExerciseDto toDto(MultipleChoiceExercise entity) {

        Long id = entity.getId();
        Long createdBy = entity.getCreatedBy();
        String question = entity.getQuestion();
        String correctChoice = entity.getCorrectChoice();
        List<String> choices = Arrays.stream(entity.getChoices().split(",")).toList();
        String purpose = entity.getPurpose();

        MultipleChoiceExerciseDto result = new MultipleChoiceExerciseDto(id,createdBy,question,choices,correctChoice, purpose);

        return result;
    }

    public List<MultipleChoiceExerciseDto> toDto(List<MultipleChoiceExercise> entityList) {
        List<MultipleChoiceExerciseDto> result = new ArrayList<>();

        entityList.forEach(exercise -> {
            MultipleChoiceExerciseDto dto = toDto(exercise);
            result.add(dto);
        });

        return result;
    }

    public MultipleChoiceExercise toEntity(MultipleChoiceExerciseDto dto) {

        Long id = dto.getId();
        Long createdBy = dto.getCreatedBy();
        String question = dto.getQuestion();
        String correctChoice = dto.getCorrectChoice();
        List<String> choicesList = dto.getChoices();
        String choices = choicesList.get(0) + "," + choicesList.get(1) + "," + choicesList.get(2) + "," + choicesList.get(3);
        String purpose = dto.getPurpose();

        MultipleChoiceExercise exercise = new MultipleChoiceExercise();
        exercise.setId(id);
        exercise.setCreatedBy(createdBy);
        exercise.setQuestion(question);
        exercise.setChoices(choices);
        exercise.setCorrectChoice(correctChoice);
        exercise.setPurpose(purpose);
        return exercise;
    }
}
