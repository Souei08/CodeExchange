//  Imports
import React from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Styles
import homeStyles from "../../assets/css/home.css";

// Components
import CustomButton from "../components/CustomButton";

const HomeScreen = ({ onLayoutRootView }) => {
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

  const handleHashtagClick = (hashtag) => {
    // Perform the action when a hashtag is clicked
    console.log(`Hashtag Clicked: ${hashtag}`);
  };

  const handleItemClick = (item) => {
    Alert.alert("Item Clicked", `You clicked on ${item.postOwner.name}`);
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={homeStyles.postsCards}>
      <Text style={homeStyles.postsName}>{item.postOwner.name}</Text>
      <TouchableOpacity onPress={() => handleItemClick(item)}>
        <Text style={homeStyles.postsParagraph}>{item.postDetails}</Text>

        <View style={{ flexDirection: "row", overflow: "hidden" }}>
          {item.postHashtags.map((hashtag) => (
            <TouchableOpacity
              key={hashtag}
              onPress={() => handleHashtagClick(hashtag)}
              style={homeStyles.hashtagContainer}
            >
              <Text style={homeStyles.hashtag}>{hashtag} </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );

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

export default HomeScreen;
