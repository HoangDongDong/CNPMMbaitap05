import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/auth";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const forgotPasswordApi = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const resetPasswordApi = async (
  email,
  otp,
  newPassword,
  confirmPassword,
) => {
  try {
    const response = await api.post("/reset-password", {
      email,
      otp,
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
