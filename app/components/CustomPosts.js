import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import postStyles from "../../assets/css/posts.css";

const CustomPosts = ({ item, handleItemClick, handleHashtagClick }) => {
  return (
    <View key={item.id} style={[postStyles.postsCards]}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/images/default/defaultProfile.jpg")}
          style={postStyles.postsOwnerProfile}
        />

        <View>
          <Text style={postStyles.postsName}>
            {item?.owner?.firstName + " " + item?.owner?.lastName}
          </Text>
          <TouchableOpacity>
            <Text style={postStyles.postsUsername}>
              @{item?.owner?.username}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleItemClick(item)}>
        <Text style={postStyles.postsParagraph}>{item?.description}</Text>

        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          {item.hashtags.map((hashtag) => (
            <TouchableOpacity
              key={hashtag}
              onPress={() => handleHashtagClick(hashtag)}
              style={postStyles.hashtagContainer}
            >
              <Text style={postStyles.postHashtags}>{hashtag} </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomPosts;
