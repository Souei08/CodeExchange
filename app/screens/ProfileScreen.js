// Imports
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

// Styles
import profileStyles from "../../assets/css/profile.css";

// Storage
import storage from "../../utils/storage";

// Custom Components
import CustomPosts from "../components/CustomPosts";
import CustomUpdateUserModal from "../components/CustomUpdateUserModal";

// Api
import postApi from "../../axios/posts";
import usersApi from "../../axios/users";

// Context
import { useAuth } from "../../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { visitUser } = useAuth();
  const [userProfile, setUserProfile] = useState([]);
  const [ownerPosts, setOwnerPosts] = useState(null);
  const [updateModalProf, setUpdateModalProf] = useState(false);

  const isModalUpdateProf = () => {
    setUpdateModalProf(true);
  };

  const closeModalUpdateProf = () => {
    setUpdateModalProf(false);
  };

  const fetchData = async () => {
    try {
      const userAuthenticated = await storage.getAuthUser();

      if (userAuthenticated || visitUser) {
        const ownerPosts = await postApi.getOwnerPosts(visitUser._id);
        const userProfile = await usersApi.findOneUser(visitUser._id);

        setOwnerPosts(ownerPosts);
        setUserProfile(userProfile);
      } else {
        console.error("Error: User authentication data is undefined.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [visitUser]);

  const renderItem = ({ item }) => (
    <CustomPosts
      item={item}
      navigation={navigation}
      loginUser={visitUser}
      getPosts={fetchData}
    />
  );

  return (
    <View style={profileStyles.profileContainer}>
      <View style={profileStyles.profileDetailsContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/default/defaultProfile.jpg")}
            style={profileStyles.profilePicture}
          />
          <View>
            <Text style={profileStyles.profileName}>
              {userProfile?.firstName + " " + userProfile?.lastName}
            </Text>
            <Text style={profileStyles.profileEmail}>
              @{userProfile?.username}
            </Text>
          </View>

          <TouchableOpacity
            onPress={isModalUpdateProf}
            style={profileStyles.profileEditIcon}
          >
            <Text>
              <Feather name="edit" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={profileStyles.profileBios}>{userProfile?.bio}</Text>
      </View>

      <Text style={profileStyles.profileTitle}>Posts</Text>
      <FlatList
        data={ownerPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        numColumns={1}
        style={{
          paddingHorizontal: 40,
        }}
      />

      <CustomUpdateUserModal
        updateModalProf={updateModalProf}
        closeModalUpdateProf={closeModalUpdateProf}
        user={userProfile}
        getUser={fetchData}
      />
    </View>
  );
};

export default ProfileScreen;
