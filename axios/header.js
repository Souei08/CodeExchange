// context/header.js
import axios from "axios";
import storage from "../utils/storage";
import { apiHeader } from "@env";

const headers = axios.create({
  baseURL: apiHeader,
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
