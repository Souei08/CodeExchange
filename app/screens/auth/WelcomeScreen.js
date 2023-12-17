// Imports
import React from "react";
import { View, Text, Image } from "react-native";

// Styles
import authStyles from "../../../assets/css/auth.css";

// Components
import CustomButton from "../../components/CustomButton";

const WelcomeScreen = ({ navigation, onLayoutRootView }) => {
  const handleNavigateLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View
      style={[authStyles.authContainer, { alignItems: "center" }]}
      onLayout={onLayoutRootView}
    >
      <View style={authStyles.authLogoContainer}>
        <Image
          source={require("../../../assets/icons/Logo.png")}
          style={authStyles.authLogo}
        />
        <Text style={authStyles.authLogoText}>
          CODE
          <Text style={{ color: "#FFCD17" }}> IDEAS</Text>
        </Text>
      </View>

      <Text style={authStyles.authSubHeader}>
        Discover a community of passionate coders eager to share ideas, solve
        problems, and collaborate on exciting projects!
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
