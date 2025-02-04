import axios from 'axios';

export const login = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, data);
    return response.data;
};

export const register = async (userData) => {
    console.log("env", import.meta.env.VITE_REACT_APP_API_URL)
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`, userData);
    return response.data;
};

