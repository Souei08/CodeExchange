// Imports
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, Alert } from "react-native";

// Styles
import profileStyles from "../../assets/css/profile.css";

// Storage
import storage from "../../utils/storage";

// Custom Components
import CustomPosts from "../components/CustomPosts";

// Api
import postApi from "../../axios/posts";

// Context
import { useAuth } from "../../context/AuthContext";

const ProfileScreen = () => {
  const { visitUser } = useAuth();
  const [ownerPosts, setOwnerPosts] = useState(null);
  const [isEditable, setIsEditable] = useState(null);

  const fetchData = async () => {
    try {
      const userAuthenticated = await storage.getAuthUser();

      if (userAuthenticated || visitUser) {
        const ownerPosts = await postApi.getOwnerPosts(visitUser._id);

        setOwnerPosts(ownerPosts);
        if (visitUser._id === userAuthenticated._id) {
          setIsEditable(true);
        }
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

  const handleHashtagClick = (hashtag) => {
    Alert.alert(`Hashtag Clicked: ${hashtag}`);
  };

  const handleItemClick = (item) => {
    Alert.alert("Item Clicked", `You clicked on ${item.owner.firstName}`);
  };

  const renderItem = ({ item }) => (
    <CustomPosts
      item={item}
      handleHashtagClick={handleHashtagClick}
      handleItemClick={handleItemClick}
      allowEdit={isEditable}
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
              {visitUser?.firstName + " " + visitUser?.lastName}
            </Text>
            <Text style={profileStyles.profileEmail}>
              @{visitUser?.username}
            </Text>
          </View>
        </View>

        <Text style={profileStyles.profileBios}>
          Learning to turn caffeine into code and errors into experience!💡
        </Text>

        <Text>Total Of Posts</Text>
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
    </View>
  );
};

export default ProfileScreen;
