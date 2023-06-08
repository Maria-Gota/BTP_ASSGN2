import axios from "axios";
import Endpoints from '../constants/Endpoints'

export const getFinancialExerciseById = async (userAccessToken , id) => {
    try {
        const response = await axios.get(`${Endpoints.GET_FINANCIAL_EXERCISE_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFinancialExerciseByCreatedBy = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_FINANCIAL_EXERCISE_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFinancialExerciseByCreatedByAndPracticePurpose = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_FINANCIAL_EXERCISE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/PRACTICE`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFinancialExerciseByCreatedByAndHelperPurpose = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_FINANCIAL_EXERCISE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/HELPER`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFinancialExerciseByCreatedByAndQuizPurpose = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_FINANCIAL_EXERCISE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/QUIZ`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFinancialExerciseByCreatedByAndExerciseType = async (userAccessToken , teacherId, exerciseType) => {
    try {
        const response = await axios.get(`${Endpoints.GET_FINANCIAL_EXERCISE_BY_CREATED_BY_AND_EXERCISE_TYPE}/${teacherId}/${exerciseType}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getPracticeFinancialExerciseByCreatedByAndStudentIdGroupBySolved = async (userAccessToken , teacherId, studentId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_PRACTICE_FINANCIAL_EXERCISE_BY_CREATED_BY_GROUP_BY_SOLVED}/${teacherId}/${studentId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export const deleteFinancialExerciseByCreatedBy = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.DELETE_FINANCIAL_EXERCISE_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteFinancialExerciseById = async (userAccessToken , id) => {
    try {
        const response = await axios.get(`${Endpoints.DELETE_FINANCIAL_EXERCISE_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createFinancialExercise = async (userAccessToken , exercise) => {
    try {
        const response = await axios.post(`${Endpoints.CREATE_FINANCIAL_EXERCISE}`,  exercise, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return [];
    }
}