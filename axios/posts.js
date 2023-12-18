// api/auth.js
import storage from "../utils/storage";
import header from "./header";

const postApi = {
  getAllPosts: async () => {
    try {
      const response = await header.get("/posts");

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOnePosts: async (id) => {
    try {
      const response = await header.get(`/posts/${id}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchPosts: async (value) => {
    try {
      const response = await header.get(`/posts/search/${value}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createPosts: async (description, tags) => {
    try {
      const authUser = await storage.getAuthUser();

      const data = {
        description: description,
        hashtags: tags,
        owner: authUser._id,
      };

      const response = await header.post("/posts/create", data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getOwnerPosts: async (id) => {
    try {
      const response = await header.get(`/posts/owner/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  likePost: async (postId) => {
    try {
      const authUser = await storage.getAuthUser();

      const response = await header.post(`/posts/${postId}/like`, {
        userId: authUser._id,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  commentPost: async (postId, comment) => {
    try {
      const authUser = await storage.getAuthUser();
      const finalData = {
        comment,
        userId: authUser._id,
      };

      const response = await header.post(
        `/posts/${postId}/comments`,
        finalData
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteComment: async (postId, commentId) => {
    try {
      const response = await header.delete(
        `/posts/${postId}/comments/${commentId}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default postApi;
