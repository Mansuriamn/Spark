// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ Change to your backend server
  withCredentials: true,
});

export default api;
