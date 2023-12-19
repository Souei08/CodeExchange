// api/auth.js
import header from "./header";

const usersApi = {
  findOneUser: async (userId) => {
    try {
      const response = await header.get(`/users/${userId}`);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        throw new Error(errorMessage);
      } else {
        console.error(error);
        throw error;
      }
    }
  },

  updateProfile: async (userId, data) => {
    try {
      const response = await header.put(`/users/update/${userId}`, data);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        throw new Error(errorMessage);
      } else {
        console.error(error);
        throw error;
      }
    }
  },

  updateProfileImage: async (userId, formData) => {
    try {
      const response = await header.post(
        `/users/updateProfilePicture/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        throw new Error(errorMessage);
      } else {
        console.error(error);
        throw error;
      }
    }
  },
};

export default usersApi;
