import axios from "axios";

// Use environment variable or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ADD TOKEN TO REQUESTS
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH API
export const authAPI = {
  register: (formData) =>
    api.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  login: (email, password) =>
    api.post("/auth/login", { email, password }),
  getMe: () => api.get("/auth/me"),
  updateProfile: (formData) =>
    api.put("/auth/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  adminRegister: (formData) =>
    api.post("/auth/admin/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  adminLogin: (email, password) =>
    api.post("/auth/admin/login", { email, password }),
};

// PRODUCTS API
export const productsAPI = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  create: (formData) =>
    api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    api.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/products/${id}`),
};

// ORDERS API
export const ordersAPI = {
  create: (orderData) => api.post("/orders", orderData),
  getMyOrders: () => api.get("/orders/user/my-orders"),
  getById: (id) => api.get(`/orders/${id}`),
  update: (id, data) => api.put(`/orders/${id}`, data),
  delete: (id) => api.delete(`/orders/${id}`),
  getAllOrders: () => api.get("/orders/admin/all"),
};

// CART API
export const cartAPI = {
  getCart: () => api.get("/cart"),
  addItem: (itemData) => api.post("/cart/add", itemData),
  updateItem: (productId, quantity) =>
    api.put("/cart/update", { productId, quantity }),
  removeItem: (productId) => api.delete(`/cart/remove/${productId}`),
  clearCart: () => api.delete("/cart/clear"),
};

export default api;
