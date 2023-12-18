// context/header.js
import axios from "axios";
import storage from "../utils/storage";

const headers = axios.create({
  baseURL: "http:///192.168.1.23:5000",
});

headers.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default headers;
