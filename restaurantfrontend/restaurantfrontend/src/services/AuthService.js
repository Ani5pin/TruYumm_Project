// src/Service/AuthService.js
// const MENU_API_URL = 'https://localhost:7075/api/Auth/login'; // Replace with your actual API URL

import API_URL from "./Config";

const MENU_API_URL = API_URL +'/Auth';

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
    };
};

export const login = async (credentials) => {
    try {
        const response = await fetch(MENU_API_URL+'/login', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token in localStorage for future use
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getToken = () => {
    return localStorage.getItem('token'); // Retrieve the token from localStorage
};

export const logout = () => {
    localStorage.removeItem('token'); // Remove the token to log the user out
};
