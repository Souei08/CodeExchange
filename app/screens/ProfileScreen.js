// Imports
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

// Styles
import profileStyles from "../../assets/css/profile.css";

// Storage
import storage from "../../utils/storage";

// Custom Components
import CustomPosts from "../components/CustomPosts";
import CustomUpdateUserModal from "../components/CustomUpdateUserModal";

// Api
import postApi from "../../axios/posts";

// Context
import { useAuth } from "../../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { visitUser } = useAuth();
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
              {visitUser?.firstName + " " + visitUser?.lastName}
            </Text>
            <Text style={profileStyles.profileEmail}>
              @{visitUser?.username}
            </Text>
          </View>

          <TouchableOpacity onPress={isModalUpdateProf}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={profileStyles.profileBios}>
          Learning to turn caffeine into code and errors into experience!💡
        </Text>
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
        user={visitUser}
      />
    </View>
  );
};

export default ProfileScreen;
