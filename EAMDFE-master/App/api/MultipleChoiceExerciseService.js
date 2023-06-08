import axios from "axios";
import Endpoints from "../constants/Endpoints";

export const getMultipleChoiceByCreatedBy = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_MULTIPLE_CHOICE_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        return [];
    }
}

export const getMultipleChoiceByCreatedByAndPracticePurpose = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_MULTIPLE_CHOICE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/PRACTICE`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getMultipleChoicePracticeByCreatedByAndStudentIdGroupBySolved = async (userAccessToken , teacherId, studentId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_PRACTICE_MULTIPLE_CHOICE_EXERCISE_BY_CREATED_BY_AND_STUDENT_ID_GROUP_BY_SOLVED}/${teacherId}/${studentId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getMultipleChoiceByCreatedByAndQuizPurpose = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_MULTIPLE_CHOICE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/QUIZ`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createMultipleChoiceExercise = async (userAccessToken , exercise) => {
    try {
        const response = await axios.post(`${Endpoints.CREATE_MULTIPLE_CHOICE_EXERCISE}`,  exercise, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return [];
    }
}
