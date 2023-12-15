import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";
const AUTH_USER = "auth_user";

const storage = {
  storeAuthUser: async (auth) => {
    try {
      const userDetailsString = JSON.stringify(auth);

      await AsyncStorage.setItem(AUTH_USER, userDetailsString);
    } catch (error) {
      console.error("Error storing user:", error);
    }
  },

  getAuthUser: async () => {
    try {
      const auth = await AsyncStorage.getItem(AUTH_USER);

      const userDetails = JSON.parse(auth);

      return userDetails;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  storeToken: async (token) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  },

  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  clearToken: async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(AUTH_USER);
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  },
};

export default storage;
