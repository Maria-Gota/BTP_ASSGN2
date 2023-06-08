package com.example.beconn.mapper.exercise.signTableExercise;

import com.example.beconn.dto.exercise.LinearSignTableExerciseDto;
import com.example.beconn.dto.exercise.QuadraticSignTableExerciseDto;
import com.example.beconn.entity.exercise.SignTableExercise;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SignTableExerciseMapper {

    public SignTableExercise toEntity(QuadraticSignTableExerciseDto dto) {
        Long id = dto.getId();
        Long createdBy = dto.getCreatedBy();
        String coefficients = dto.getA() + "," + dto.getB() + "," + dto.getC();
        String domainBounds = dto.getDomainLowerBound() + "," + dto.getDomainUpperBound();
        String correctSigns = dto.getFirstIntervalSign() + dto.getSecondIntervalSign() + dto.getThirdIntervalSign();
        String solutions = dto.getX1() + "," + dto.getX2();
        String purpose = dto.getPurpose();

        SignTableExercise exercise = new SignTableExercise();
        exercise.setId(id);
        exercise.setFunctionType("quadratic");
        exercise.setCreatedBy(createdBy);
        exercise.setCoefficients(coefficients);
        exercise.setDomainBounds(domainBounds);
        exercise.setCorrectSigns(correctSigns);
        exercise.setSolutions(solutions);
        exercise.setPurpose(purpose);

        return exercise;
    }

    public SignTableExercise toEntity(LinearSignTableExerciseDto dto) {
        Long id = dto.getId();
        Long createdBy = dto.getCreatedBy();
        String coefficients = dto.getA() + "," + dto.getB();
        String domainBounds = dto.getDomainLowerBound() + "," + dto.getDomainUpperBound();
        String correctSigns = dto.getFirstIntervalSign() + dto.getSecondIntervalSign();
        String purpose = dto.getPurpose();

        SignTableExercise exercise = new SignTableExercise();
        exercise.setId(id);
        exercise.setFunctionType("linear");
        exercise.setCreatedBy(createdBy);
        exercise.setCoefficients(coefficients);
        exercise.setDomainBounds(domainBounds);
        exercise.setCorrectSigns(correctSigns);
        exercise.setSolutions("");
        exercise.setPurpose(purpose);

        return exercise;
    }

    public QuadraticSignTableExerciseDto toQuadraticDto(SignTableExercise entity) {
        Long id = entity.getId();
        Long createdBy = entity.getCreatedBy();
        String domainBounds = entity.getDomainBounds();
        String purpose = entity.getPurpose();
        List<String> coefficients = Arrays.stream(entity.getCoefficients().split(",")).toList();
        List<String> bounds = Arrays.stream(entity.getDomainBounds().split(",")).toList();
        List<String> solutions = Arrays.stream(entity.getSolutions().split(",")).toList();
        String a = coefficients.get(0);
        String b = coefficients.get(1);
        String c = coefficients.get(2);

        String domainLowerBound = "";
        String domainUpperBound = "";

        if (domainBounds.length() > 1) {

            if (bounds.size() == 1) {
                if (domainBounds.endsWith(",")) {
                    domainLowerBound = bounds.get(0);
                } else if (domainBounds.startsWith(",")) {
                    domainUpperBound = bounds.get(0);
                }
            } else {
                domainLowerBound = bounds.get(0);
                domainUpperBound = bounds.get(1);
            }
        }
        String firstIntervalSign = entity.getCorrectSigns().substring(0, 1);
        String secondIntervalSign = entity.getCorrectSigns().substring(1, 2);
        String thirdIntervalSign = entity.getCorrectSigns().substring(2);
        String x1 = solutions.get(0);
        String x2 = solutions.get(1);

        QuadraticSignTableExerciseDto dto = new QuadraticSignTableExerciseDto(id, createdBy, a, b, c, x1, x2, domainLowerBound, domainUpperBound, firstIntervalSign, secondIntervalSign, thirdIntervalSign, purpose);
        return dto;
    }

    public LinearSignTableExerciseDto toLinearDto(SignTableExercise entity) {
        Long id = entity.getId();
        Long createdBy = entity.getCreatedBy();
        String domainBounds = entity.getDomainBounds();
        List<String> coefficients = Arrays.stream(entity.getCoefficients().split(",")).toList();
        List<String> bounds = Arrays.stream(entity.getDomainBounds().split(",")).toList();
        String a = coefficients.get(0);
        String b = coefficients.get(1);
        String purpose = entity.getPurpose();

        String domainLowerBound = "";
        String domainUpperBound = "";

        if (domainBounds.length() > 1) {

            if (bounds.size() == 1) {
                if (domainBounds.endsWith(",")) {
                    domainLowerBound = bounds.get(0);
                } else if (domainBounds.startsWith(",")) {
                    domainUpperBound = bounds.get(0);
                }
            } else {
                domainLowerBound = bounds.get(0);
                domainUpperBound = bounds.get(1);
            }
        }

        String firstIntervalSign = entity.getCorrectSigns().substring(0, 1);
        String secondIntervalSign = entity.getCorrectSigns().substring(1);

        LinearSignTableExerciseDto dto = new LinearSignTableExerciseDto(id, createdBy, a, b, domainLowerBound, domainUpperBound, firstIntervalSign, secondIntervalSign, purpose);
        return dto;
    }

    public List<LinearSignTableExerciseDto> toLinearDto(List<SignTableExercise> entity) {
        List<LinearSignTableExerciseDto> result = new ArrayList<>();
        entity.forEach(exercise -> {
            LinearSignTableExerciseDto dto = toLinearDto(exercise);
            result.add(dto);
        });
        return result;
    }

    public List<QuadraticSignTableExerciseDto> toQuadraticDto(List<SignTableExercise> entity) {
        List<QuadraticSignTableExerciseDto> result = new ArrayList<>();

        entity.forEach(exercise -> {
            QuadraticSignTableExerciseDto dto = toQuadraticDto(exercise);
            result.add(dto);
        });
        return result;
    }
}
