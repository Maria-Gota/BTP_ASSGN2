import axios from "axios";
import Endpoints from "../constants/Endpoints";


export const getAllFormulas = async (userAccessToken) => {

    try {
        const response = await axios.get(`${Endpoints.GET_ALL_FORMULAS}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFormulaById = async (userAccessToken , id) => {

    try {
        const response = await axios.get(`${Endpoints.GET_FORMULA_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFormulaByName = async (userAccessToken , name) => {

    try {
        const response = await axios.get(`${Endpoints.GET_FORMULA_BY_NAME}/${name}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFormulaByType = async (userAccessToken , type) => {

    try {
        const response = await axios.get(`${Endpoints.GET_FORMULA_BY_TYPE}/${type}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
