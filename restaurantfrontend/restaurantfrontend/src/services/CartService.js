import axios from "axios";

// Set your base API URL (change this if needed)
import API_URL from "./Config";

const MENU_API_URL = API_URL + "/Cart";

// Fetch all items in the cart
export const getCartItems = async (token) => {
  try {
    const response = await axios.get(`${MENU_API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch cart items"
    );
  }
};

// Remove a specific item from the cart
export const removeCartItem = async (itemId, token) => {
  try {
    const response = await axios.delete(`${MENU_API_URL}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to remove cart item"
    );
  }
};

// Checkout the cart (clears the cart after a successful purchase)
export const checkoutCart = async (token) => {
  try {
    const response = await axios.post(
      `${MENU_API_URL}/checkout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to checkout");
  }
};

// Checkout the cart (clears the cart after a successful purchase)
export const AddItemIntoCart = async (data, token) => {
  try {
    const response = await axios.post(`${MENU_API_URL}/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to checkout");
  }
};

export const RemoveItemFromCart = async (data, token) => {
  try {
    const response = await axios.post(`${MENU_API_URL}/remove`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to checkout");
  }
};
