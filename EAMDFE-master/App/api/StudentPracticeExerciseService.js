import axios from "axios";
import Endpoints from "../constants/Endpoints";


export const getStudentPracticeExerciseById = async (userAccessToken , id) => {

    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_PRACTICE_EXERCISE_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStudentPracticeExerciseByStudentId = async (userAccessToken , studentId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_PRACTICE_EXERCISE_BY_STUDENT_ID}/${studentId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStudentPracticeExerciseByStudentIdAndExerciseId = async (userAccessToken , studentId , exerciseId ) => {

    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_PRACTICE_EXERCISE_BY_STUDENT_ID_AND_EXERCISE_ID}/${studentId}/${exerciseId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getStudentPracticeExerciseByStudentIdAndExerciseIdOrCreate = async (userAccessToken , studentId , exerciseId ) => {

    try {
        const response = await axios.get(`${Endpoints.GET_STUDENT_PRACTICE_EXERCISE_BY_STUDENT_ID_AND_EXERCISE_ID_OR_CREATE}/${studentId}/${exerciseId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.log("GOT ERROR HERE");
        console.error(error);
        console.log(error.data)
        return [];
    }
}

// export const createStudentPracticeExercise = async (userAccessToken , StudentPracticeExercise ) => {
//     try {
//         const response = await axios.post(`${Endpoints.CREATE_STUDENT_PRACTICE}` , StudentPracticeExercise , {
//             headers: { Authorization: `Bearer ${userAccessToken}` }
//         });
//         return response.status;
//     } catch (error) {
//         console.error(error);
//         return undefined;
//     }
// }

export const updateStudentPracticeExercise = async (userAccessToken , StudentPracticeExercise ) => {
    try {
        const response = await axios.put(`${Endpoints.UPDATE_STUDENT_PRACTICE_EXERCISE}` , StudentPracticeExercise , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
