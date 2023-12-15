// Imports
import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Styles
import authStyles from "../../../assets/css/auth.css";

// Components
import CustomButton from "../../components/CustomButton";

// Api And Context
import authApi from "../../../axios/auth";
import { useAuth } from "../../../context/AuthContext";

const LoginScreen = ({ navigation, onLayoutRootView }) => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    if (!username || !password) {
      Alert.alert("Please provide email and password");

      return false;
    }

    try {
      const userAuthenticated = await authApi.login(username, password);

      Alert.alert(userAuthenticated.message);

      login();
    } catch (error) {
      Alert.alert(error.message);
      return;
    }

    setUsername("");
    setPassword("");
  };

  const handleNavigateRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={authStyles.authContainer} onLayout={onLayoutRootView}>
      <Text
        style={[
          authStyles.authHeader,
          { marginBottom: 30, alignSelf: "center" },
        ]}
      >
        Login
      </Text>

      <View>
        <TextInput
          style={authStyles.authInputs}
          placeholder="Username"
          onChangeText={handleUsernameChange}
          value={username}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={authStyles.authInputs}
          placeholder="Password"
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry
          placeholderTextColor="#fff"
        />

        <CustomButton
          onPress={handleSubmit}
          buttonText={"Login"}
          buttonContainerStyle={[
            authStyles.authButtonContainer,
            { width: "100%", marginBottom: 5, marginTop: 0 },
          ]}
          ButtonTextStyle={authStyles.authButtonText}
        />

        <TouchableOpacity onPress={handleNavigateRegister}>
          <Text style={authStyles.authRegisterText}>
            Don’t have account? Sign up now.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
