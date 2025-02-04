
import axios from 'axios';

export const createEvent = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/event/create`, data);
    return response.data
}

export const getAllEvent = async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/event/all`);
    return response.data
}