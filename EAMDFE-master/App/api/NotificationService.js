import axios from "axios";
import Endpoints from "../constants/Endpoints";

export const getNotificationByRecipientId = async (userAccessToken , recipientId) => {

    try {
        const response = await axios.get(`${Endpoints.GET_NOTIFICATION_BY_RECIPIENT_ID}/${recipientId}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const updateNotification = async (userAccessToken , notification) => {
    try {
        const response = await axios.put(`${Endpoints.UPDATE_NOTIFICATION}` , notification , {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        });
        return response.status;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}