import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTopProductsApi = async ({ type, page, limit } = {}) => {
  try {
    const response = await api.get("/api/products/top", {
      params: {
        ...(type ? { type } : {}),
        ...(Number.isFinite(page) ? { page } : {}),
        ...(Number.isFinite(limit) ? { limit } : {}),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
