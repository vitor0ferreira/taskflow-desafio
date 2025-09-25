import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (config.headers && config.headers.AuthorizationToken) {
    config.headers.Authorization = `Bearer ${config.headers.AuthorizationToken}`;
    delete config.headers.AuthorizationToken;
  }
  return config;
});

export default api;
