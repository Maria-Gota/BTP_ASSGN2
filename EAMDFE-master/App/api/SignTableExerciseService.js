import axios from "axios";
import Endpoints from "../constants/Endpoints";

export const getLinearSignTableByCreatedBy = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_LINEAR_SIGN_TABLE_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getLinearSignTableByCreatedByAndPracticePurpose = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_LINEAR_SIGN_TABLE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/PRACTICE`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export const getLinearSignTableByCreatedByAndQuizPurpose = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_LINEAR_SIGN_TABLE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/QUIZ`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getLinearSignTableByCreatedByAndHelperPurpose = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_LINEAR_SIGN_TABLE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/HELPER`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getLinearSignTablePracticeByCreatedByAndStudentIdGroupBySolved = async (userAccessToken , teacherId, studentId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_PRACTICE_LINEAR_SIGN_TABLE_EXERCISE_BY_CREATED_BY_GROUP_BY_SOLVED}/${teacherId}/${studentId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuadraticSignTablePracticeByCreatedByAndStudentIdGroupBySolved = async (userAccessToken , teacherId, studentId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_PRACTICE_QUADRATIC_SIGN_TABLE_EXERCISE_BY_CREATED_BY_GROUP_BY_SOLVED}/${teacherId}/${studentId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createLinearSignTableExercise = async (userAccessToken , exercise) => {
    try {
        const response = await axios.post(`${Endpoints.CREATE_LINEAR_SIGN_TABLE_EXERCISE}`,  exercise, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuadraticSignTableByCreatedBy = async (userAccessToken , teacherId) => {
 
    try {
        const response = await axios.get(`${Endpoints.GET_QUADRATIC_SIGN_TABLE_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuadraticSignTableByCreatedByAndPracticePurpose = async (userAccessToken , teacherId) => {
 
    try {
        const response = await axios.get(`${Endpoints.GET_QUADRATIC_SIGN_TABLE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/PRACTICE`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuadraticSignTableByCreatedByAndHelperPurpose = async (userAccessToken , teacherId) => {
 
    try {
        const response = await axios.get(`${Endpoints.GET_QUADRATIC_SIGN_TABLE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/HELPER`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuadraticSignTableByCreatedByAndQuizPurpose = async (userAccessToken , teacherId) => {
 
    try {
        const response = await axios.get(`${Endpoints.GET_QUADRATIC_SIGN_TABLE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/QUIZ`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createQuadraticSignTableExercise = async (userAccessToken , exercise) => {
    try {
        const response = await axios.post(`${Endpoints.CREATE_QUADRATIC_SIGN_TABLE_EXERCISE}`,  exercise, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return [];
    }
}
