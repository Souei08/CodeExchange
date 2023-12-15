// Imports
import React from "react";
import { View, Text, Image } from "react-native";

// Styles
import profileStyles from "../../assets/css/profile.css";

const PostScreen = ({}) => {
  return (
    <View style={profileStyles.profileContainer}>
      <View style={profileStyles.profileDetailsContainer}>
        <Image
          source={require("../../assets/images/default/defaultProfile.jpg")}
          style={profileStyles.profilePicture}
        />

        <Text style={profileStyles.profileName}>Nigga Renzle</Text>
        <Text style={profileStyles.profileEmail}>nigg@gmail.com</Text>
      </View>

      <Text style={profileStyles.profileTitle}>Posts</Text>
    </View>
  );
};

export default PostScreen;
