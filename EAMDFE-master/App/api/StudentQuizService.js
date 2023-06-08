import axios from "axios";
import Endpoints from "../constants/Endpoints";

export const getStudentQuizById = async (userAccessToken , id) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_QUIZ_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStudentQuizByStudentId = async (userAccessToken , studentId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_QUIZ_BY_STUDENT_ID}/${studentId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStudentQuizByQuizId = async (userAccessToken , quizId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_QUIZ_BY_QUIZ_ID}/${quizId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStudentQuizByStudentIdAndQuizId = async (userAccessToken , studentId , quizId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_QUIZ_BY_STUDENT_ID_AND_QUIZ_ID}/${studentId}/${quizId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        console.log("SUCCESSFUL");
        return response.data;
    } catch (error) {
        console.log("FOUND ERROR ");
        console.error(error);
        return [];
    }
}

export const updateStudentQuiz = async (userAccessToken , studentQuiz) => {
    try {
        const response = await axios.put(`${Endpoints.UPDATE_STUDENT_QUIZ}` , studentQuiz , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const updateStudentQuizTriesLeft = async (userAccessToken , studentQuizId , numberOfTries) => {
    try {
        const response = await axios.put(`${Endpoints.UPDATE_STUDENT_QUIZ_TRIES_LEFT}/${studentQuizId}/${numberOfTries}` , null , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const decreaseStudentQuizTriesLeft = async (userAccessToken , id) => {
    try {
        const response = await axios.put(`${Endpoints.DECREASE_STUDENT_QUIZ_TRIES_LEFT}/${id}` , null , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getStudentQuizByQuizIdAndSolved = async (userAccessToken , quizId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_QUIZ_BY_QUIZ_ID_AND_SOLVED}/${quizId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStudentQuizByQuizIdAndNotSolved = async (userAccessToken , quizId , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_QUIZ_BY_QUIZ_ID_AND_NOT_SOLVED}/${quizId}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStudentQuizByStudentIdSolved = async (userAccessToken , studentId, solved) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_QUIZ_BY_STUDENT_ID_AND_SOLVED}/${studentId}/${solved}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}