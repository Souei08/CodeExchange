// Imports
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

// Styles
import profileStyles from "../../assets/css/profile.css";
import homeStyles from "../../assets/css/home.css";

const ProfileScreen = () => {
  const DummyTestPosts = Array.from({ length: 20 }, (_, i) => {
    return {
      id: i + 1,
      postOwner: {
        name: "Renzle Nigga",
        email: "renzle@gmail.com",
      },
      postDetails: `Learned a new programming language.`,
      postHashtags: ["#Coding", "#HelloWorld"],
    };
  });

  const handleItemClick = (item) => {
    Alert.alert("Item Clicked", `You clicked on ${item.postOwner.name}`);
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={homeStyles.postsCards}>
      <Text style={homeStyles.postsName}>{item.postOwner.name}</Text>
      <TouchableOpacity onPress={() => handleItemClick(item)}>
        <Text style={homeStyles.postsParagraph}>{item.postDetails}</Text>
        <Text style={homeStyles.postsParagraph}>#Coding</Text>
      </TouchableOpacity>
    </View>
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
            <Text style={profileStyles.profileName}>Nigga Renzle</Text>
            <Text style={profileStyles.profileEmail}>nigg@gmail.com</Text>
          </View>
        </View>

        <Text style={profileStyles.profileBios}>
          🚀 Learning to turn caffeine into code and errors into experience!💡
        </Text>
      </View>

      <Text style={profileStyles.profileTitle}>Posts</Text>
      <FlatList
        data={DummyTestPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        style={{
          paddingHorizontal: 40,
        }}
      />
    </View>
  );
};

export default ProfileScreen;
