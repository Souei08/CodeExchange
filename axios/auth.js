// api/auth.js
import storage from "../utils/storage";
import header from "./header";

const authApi = {
  login: async (email, password) => {
    try {
      const response = await header.post("/users/login", { email, password });

      const token = response.data.token;
      const userDetails = response.data.userDetails;

      await storage.storeToken(token);
      await storage.storeAuthUser(userDetails);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  register: async (data) => {
    try {
      const response = await header.post("/users/create", data);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        throw new Error(errorMessage);
      } else {
        console.error(error);
        throw error;
      }
    }
  },

  logout: async () => {
    await storage.clearToken();
  },

  isAuthenticated: async () => {
    const token = await storage.getToken();
    return !!token;
  },

  checkToken: async () => {
    try {
      const response = await header.get("/checkToken");

      return response;
    } catch (error) {
      return error.response?.status;
    }
  },
};

export default authApi;
