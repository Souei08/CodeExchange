// Imports
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { View, Image, TouchableOpacity } from "react-native";

// .env
import { apiHeader } from "@env";

// Styles
import profileStyles from "../../assets/css/profile.css";

// Api
import usersApi from "../../axios/users";

const CustomImagePicker = ({ user, fetchData, isEditable }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const uploadImage = async (image) => {
    const formData = new FormData();

    const uriParts = image.uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("profilePicture", {
      uri: image.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      await usersApi.updateProfileImage(user._id, formData);

      fetchData();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0]);
    }
  };

  const imageSource = user?.profileImage
    ? {
        uri: `${apiHeader}/${user?.profileImage}`,
      }
    : require("../../assets/images/default/defaultProfile.jpg");

  return (
    <View style={profileStyles.profileEditImageContainer}>
      {isEditable && (
        <TouchableOpacity
          style={profileStyles.profileIconContainer}
          onPress={pickImage}
        >
          <Entypo name="image" size={20} color="#fff" />
        </TouchableOpacity>
      )}

      {image ? (
        <Image source={{ uri: image }} style={profileStyles.profileEditImage} />
      ) : (
        <Image source={imageSource} style={profileStyles.profileEditImage} />
      )}
    </View>
  );
};

export default CustomImagePicker;
