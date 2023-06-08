package com.example.beconn.exception;

import jakarta.persistence.NoResultException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

import static com.example.beconn.exception.ExceptionUtils.*;
import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(code = BAD_REQUEST)
    @ResponseBody
    public Map<String, Object> handleConstraintViolation(ConstraintViolationException x) {

        Map<String, Object> error = new HashMap<>();
        if(isUniqueConstraint(x)) {
            error.put("type", "unique");
            error.put("violatedConstraint", getFieldForUniqueConstraint(x));
        } else if (isNotNullConstraint(x)) {
            error.put("type", "null");
            error.put("violatedConstraint", getFieldForNotNullConstraint(x));
        } else {
            error.put("type","unknown");
        }
        return error;
    }

    @ExceptionHandler(NoResultException.class)
    @ResponseStatus(code = NOT_FOUND)
    @ResponseBody
    public Map<String, Object> handleNoResultException(NoResultException x) {

        Map<String, Object> error = new HashMap<>();

        error.put("type","no_result");

        return error;
    }
}