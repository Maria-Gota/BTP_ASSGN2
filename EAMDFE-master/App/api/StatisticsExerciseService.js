import axios from "axios";
import Endpoints from "../constants/Endpoints";

export const getStatisticsExerciseById = async (userAccessToken , id) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STATISTICS_EXERCISE_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStatisticsExerciseByCreatedBy = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STATISTICS_EXERCISE_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStatisticsExerciseByCreatedByAndPracticePurpose = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STATISTICS_EXERCISE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/PRACTICE`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStatisticsExerciseByCreatedByAndHelperPurpose = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STATISTICS_EXERCISE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/HELPER`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStatisticsExerciseByCreatedByAndQuizPurpose = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STATISTICS_EXERCISE_BY_CREATED_BY_AND_PURPOSE}/${teacherId}/QUIZ`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStatisticsPracticeByCreatedByAndStudentIdGroupBySolved = async (userAccessToken , teacherId, studentId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_PRACTICE_STATISTICS_EXERCISE_BY_CREATED_BY_AND_STUDENT_ID_GROUP_BY_SOLVED}/${teacherId}/${studentId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStatisticsAbsoluteFrequencyTableExerciseByCreatedBy = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STATISTICS_EXERCISE_BY_CREATED_BY_AND_EXERCISE_TYPE}/${teacherId}/ABSOLUTE_FREQUENCY_TABLE`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStatisticsRelativeFrequencyTableExerciseByCreatedBy = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STATISTICS_EXERCISE_BY_CREATED_BY_AND_EXERCISE_TYPE}/${teacherId}/RELATIVE_FREQUENCY_TABLE`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStatisticsCentralTendencyMeasuresExerciseByCreatedBy = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.GET_STATISTICS_EXERCISE_BY_CREATED_BY_AND_EXERCISE_TYPE}/${teacherId}/CENTRAL_TENDENCY_MEASURES`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteStatisticsExerciseByCreatedBy = async (userAccessToken , teacherId) => {
    try {
        const response = await axios.get(`${Endpoints.DELETE_STATISTICS_EXERCISE_BY_CREATED_BY}/${teacherId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteStatisticsExerciseById = async (userAccessToken , id) => {
    try {
        const response = await axios.get(`${Endpoints.DELETE_STATISTICS_EXERCISE_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createStatisticsExercise = async (userAccessToken , exercise) => {
    try {
        const response = await axios.post(`${Endpoints.CREATE_STATISTICS_EXERCISE}`,  exercise, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return [];
    }
}