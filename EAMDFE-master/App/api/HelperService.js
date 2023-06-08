import axios from "axios";
import Endpoints from "../constants/Endpoints";



export const getHelperById = async (userAccessToken , id) => {

    try {
        const response = await axios.get(`${Endpoints.GET_HELPER_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getHelperByCreatedByAndType = async (userAccessToken , createdBy , type) => {

    try {
        const response = await axios.get(`${Endpoints.GET_HELPER_BY_CREATED_BY_AND_TYPE}/${createdBy}/${type}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createHelper = async (userAccessToken , helper ) => {
    try {
        const response = await axios.post(`${Endpoints.CREATE_HELPER}` , helper , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}


export const deleteHelperById = async (userAccessToken , id) => {
    try {
        const response = await axios.delete(`${Endpoints.DELETE_HELPER_BY_ID}/${id}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error("ERROR FROM HELPER SERVICE",error);
        return [];
    }
}