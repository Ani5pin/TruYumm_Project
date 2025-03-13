// const API_URL = 'https://localhost:7099/api/MenuItems'; // Replace with your API URL
import API_URL from "./Config";

const MENU_API_URL = API_URL +'/MenuItems';
const getHeaders = (token) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const getMenuItems = async (token) => {
    try {
        debugger
        const response = await fetch(MENU_API_URL, {
            method: 'GET',
            headers: getHeaders(token),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch Menu Items');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getMenuItemById = async (id, token) => {
    try {
        const response = await fetch(`${MENU_API_URL}/${id}`, {
            method: 'GET',
            headers: getHeaders(token),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch Menu Item: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addMenuItem = async (menuItem, token) => {
    try {
        const response = await fetch(MENU_API_URL, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify(menuItem),
        });
        if (!response.ok) {
            throw new Error('Failed to add Menu Item');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateMenuItem = async (id, menuItem, token) => {
    try {
        const response = await fetch(`${MENU_API_URL}/${id}`, {
            method: 'PUT',
            headers: getHeaders(token),
            body: JSON.stringify(menuItem),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update Menu Item: ${errorData.title}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteMenuItem = async (id, token) => {
    try {
        const response = await fetch(`${MENU_API_URL}/${id}`, {
            method: 'DELETE',
            headers: getHeaders(token),
        });
        if (!response.ok) {
            throw new Error('Failed to delete Menu Item');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
