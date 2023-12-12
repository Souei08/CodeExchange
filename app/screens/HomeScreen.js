//  Imports
import React from "react";
import { Text, TextInput, View } from "react-native";

// Styles
import homeStyles from "../../assets/css/home.css";

// Components
import CustomButton from "../components/CustomButton";

const HomeScreen = ({ onLayoutRootView }) => {
  return (
    <View style={homeStyles.homeContainer} onLayout={onLayoutRootView}>
      <View style={homeStyles.homeCreateContainer}>
        <TextInput
          style={homeStyles.homeCreateInput}
          placeholder="Create Posts.."
        />

        <CustomButton
          buttonText={"Create Posts"}
          ButtonTextStyle={homeStyles.homeCreateButtonText}
          buttonContainerStyle={homeStyles.homeCreateButtonContainer}
        />
      </View>

      <Text style={homeStyles.homeTitle}>Timeline</Text>

      <View style={homeStyles.postsCards}>
        <Text style={homeStyles.postsName}>Nigga Renzle</Text>
        <Text style={homeStyles.postsParagraph}>
          Learned a new programming language.
        </Text>
        <Text style={homeStyles.postsParagraph}>#Coding</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
