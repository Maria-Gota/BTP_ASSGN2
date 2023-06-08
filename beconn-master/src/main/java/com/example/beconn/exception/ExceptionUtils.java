package com.example.beconn.exception;


import org.hibernate.exception.ConstraintViolationException;

public class ExceptionUtils {

    public static String getFieldForUniqueConstraint(Throwable x) {
        String constraintName = ((ConstraintViolationException) x).getConstraintName();
        int index = constraintName.lastIndexOf(".") + 1;
        String result = constraintName.substring(index);
        return result;
    }

    public static String getFieldForNotNullConstraint(Throwable x) {
        String constraint = ((ConstraintViolationException) x).getSQLException().getMessage();
        System.out.println(constraint);
        int startIndex = constraint.indexOf("'") + 1;
        int endIndex = constraint.lastIndexOf("'");
        String result = constraint.substring(startIndex, endIndex);
        return result;
    }

    public static boolean isUniqueConstraint(ConstraintViolationException x) {

        return x.getErrorCode() == 1062;
    }

    public static boolean isNotNullConstraint(ConstraintViolationException x) {

        return x.getErrorCode() == 1048;
    }
}
