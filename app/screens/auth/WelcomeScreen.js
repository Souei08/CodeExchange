// Imports
import React from "react";
import { View, Text } from "react-native";

// Styles
import authStyles from "../../../assets/css/auth.css";

// Components
import CustomButton from "../../components/CustomButton";

const WelcomeScreen = ({ navigation, onLayoutRootView }) => {
  const handleNavigateLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={authStyles.authContainer} onLayout={onLayoutRootView}>
      <Text style={authStyles.authHeader}>Code {"\n"}Exchange</Text>
      <Text style={authStyles.authSubHeader}>
        Discover a community of passionate {"\n"}coders eager to share ideas,
        solve {"\n"}problems, and collaborate on exciting {"\n"}projects!
      </Text>

      <CustomButton
        buttonText="Get Started"
        onPress={handleNavigateLogin}
        buttonContainerStyle={authStyles.authButtonContainer}
        ButtonTextStyle={authStyles.authButtonText}
      />
    </View>
  );
};

export default WelcomeScreen;
