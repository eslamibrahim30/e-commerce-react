import axios from "axios";

const api = axios.create({
	baseURL: "https://api.escuelajs.co/api/v1",
});

export const getProducts = (params = {}) => api.get("/products", { params });

export const getProductById = (id) => api.get(`/products/${id}`);

export const getCategories = () => api.get("/categories");
