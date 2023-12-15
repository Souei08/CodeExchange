// api/auth.js
import header from "./header";
import storage from "../utils/storage";

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
      throw error;
    }
  },

  register: async (data) => {
    try {
      const { firstName, lastName, username, password, email } = data;
      const response = await header.post("/users/create", {
        firstName,
        lastName,
        username,
        password,
        email,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  logout: async () => {
    await storage.clearToken();
  },

  isAuthenticated: async () => {
    const token = await storage.getToken();
    return !!token;
  },
};

export default authApi;
