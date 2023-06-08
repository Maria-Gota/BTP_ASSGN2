import axios from "axios";
import Endpoints from "../constants/Endpoints";

export const getQuizByCreatedBy = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_QUIZ_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuizByCreatedByAndQuizType = async (userAccessToken , teacherId, quizType) => {
    try {
        const response = await axios.get(`${Endpoints.GET_QUIZ_BY_CREATED_BY_AND_QUIZ_TYPE}/${teacherId}/${quizType}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuizByCreatedByAndQuizTypeAndVisibility = async (userAccessToken , teacherId, quizType) => {
    try {
        const response = await axios.get(`${Endpoints.GET_QUIZ_BY_CREATED_BY_AND_QUIZ_TYPE_AND_VISIBILITY}/${teacherId}/${quizType}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getQuizById = async (userAccessToken , quizId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_QUIZ_BY_ID}/${quizId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export const deleteQuizByCreatedBy = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.DELETE_QUIZ_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteQuizById = async (userAccessToken , id) => {
    try {
        const response = await axios.delete(`${Endpoints.DELETE_QUIZ_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createQuiz = async (userAccessToken , quiz) => {
    try {
        const response = await axios.post(`${Endpoints.CREATE_QUIZ}`,  quiz, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const updateQuizVisibility = async (userAccessToken , quizId) => {
    try {
        const response = await axios.put(`${Endpoints.UPDATE_QUIZ_VISIBILITY}/${quizId}` , null , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
