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

const ProfileScreen = () => {
  const [authUser, setAuthUser] = useState(null);
  const [ownerPosts, setOwnerPosts] = useState(null);

  const fetchData = async () => {
    try {
      const userAuthenticated = await storage.getAuthUser();

      if (userAuthenticated) {
        const ownerPosts = await postApi.getOwnerPosts(userAuthenticated._id);

        setAuthUser(userAuthenticated);
        setOwnerPosts(ownerPosts);
      } else {
        console.error("Error: User authentication data is undefined.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              {authUser?.firstName + " " + authUser?.lastName}
            </Text>
            <Text style={profileStyles.profileEmail}>
              @{authUser?.username}
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
