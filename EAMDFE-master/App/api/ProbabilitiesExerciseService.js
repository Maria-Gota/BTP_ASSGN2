import axios from "axios";
import Endpoints from "../constants/Endpoints";


export const getProbabilitiesExerciseByCreatedBy = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_PROBABILITIES_EXERCISE_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getProbabilitiesExerciseByCreatedByAndPracticePurpose = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_PROBABILITIES_EXERCISE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/PRACTICE`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getProbabilitiesExerciseByCreatedByAndHelperPurpose = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_PROBABILITIES_EXERCISE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/HELPER`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getProbabilitiesExerciseByCreatedByAndQuizPurpose = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_PROBABILITIES_EXERCISE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/QUIZ`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getProbabilitiesExerciseById = async (userAccessToken , probabilityId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_PROBABILITIES_EXERCISE_BY_ID}/${probabilityId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getProbabilitiesPracticeByCreatedByAndStudentIdGroupBySolved = async (userAccessToken , teacherId, studentId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_PRACTICE_PROBABILITIES_EXERCISE_BY_CREATED_BY_AND_STUDENT_ID_GROUP_BY_SOLVED}/${teacherId}/${studentId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createProbabilitiesExercise = async (userAccessToken , exercise) => {
    try {
        const response = await axios.post(`${Endpoints.CREATE_PROBABILITIES_EXERCISE}`,  exercise, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteProbabilitiesExerciseById = async (userAccessToken , probabilityId) => {
    try {
        const response = await axios.delete(`${Endpoints.DELETE_PROBABILITIES_EXERCISE_BY_ID}/${probabilityId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteProbabilitiesExerciseByCreatedBy = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.delete(`${Endpoints.DELETE_PROBABILITIES_EXERCISE_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
