// api/auth.js
import storage from "../utils/storage";
import header from "./header";

const postApi = {
  getAllPosts: async () => {
    try {
      const response = await header.get("/products");

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createProducts: async (description, tags) => {
    try {
      const authUser = await storage.getAuthUser();

      const data = {
        description: description,
        hashtags: tags,
        owner: authUser._id,
      };

      console.log(data);

      const response = await header.post("/products/create", data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getOwnerPosts: async (id) => {
    try {
      const response = await header.get(`/products/owner/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default postApi;
