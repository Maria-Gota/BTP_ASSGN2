import axios from "axios";
import Endpoints from "../constants/Endpoints";

export const getStudentStatsById = async (userAccessToken , id) => {

    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_STATS_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export const getStudentStatsByStudentId = async (userAccessToken , studentId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_STATS_BY_STUDENT_ID}/${studentId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export const getStudentStatsByTeacherId = async (userAccessToken , teacherId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_STATS_BY_TEACHER_ID}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export const increaseExerciseSolutionGrant = async (userAccessToken , id , number) => {
    try {
        const response = await axios.put(`${Endpoints.INCREASE_EXERCISE_SOLUTION_GRANT}/${id}/${number}` , null , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const decreaseExerciseSolutionGrant = async (userAccessToken , id) => {
    try {
        const response = await axios.put(`${Endpoints.DECREASE_EXERCISE_SOLUTION_GRANT}/${id}` , null , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const increaseQuizTryGrant = async (userAccessToken , id , number) => {
    try {
        const response = await axios.put(`${Endpoints.INCREASE_QUIZ_TRY_GRANT}/${id}/${number}` , null , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const decreaseQuizTryGrant = async (userAccessToken , id ) => {
    try {
        const response = await axios.put(`${Endpoints.DECREASE_QUIZ_TRY_GRANT}/${id}` , null , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}