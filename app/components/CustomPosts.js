// Imports
import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";

// Styles
import postStyles from "../../assets/css/posts.css";

// Custom Components
import MoreDropdown from "./CustomMoreDropdown";

// Context
import { useAuth } from "../../context/AuthContext";

// Api
import postApi from "../../axios/posts";

const CustomPosts = ({
  item,
  type,
  navigation,
  allowEdit,
  getPosts,
  loginUser,
}) => {
  const { setUserVisit, setVisitPost } = useAuth();
  const options = ["Edit", "Delete"];

  const handleVisitUser = async (item) => {
    await setUserVisit(item.owner);
    await navigation.navigate("Profile");
  };

  const handleLikePost = async (item) => {
    await postApi.likePost(item._id);
    getPosts();
  };

  const handleHashtagClick = (hashtag) => {
    Alert.alert(`Hashtag Clicked: ${hashtag}`);
  };

  const handleItemClick = async (item) => {
    await setVisitPost(item);
    navigation.navigate("PostDetail");
  };

  const postLiked = (item) => {
    return (
      item.likes.filter((item) => item.user === loginUser._id).length === 1
    );
  };

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
          <TouchableOpacity onPress={() => handleVisitUser(item)}>
            <Text style={postStyles.postsUsername}>
              @{item?.owner?.username}
            </Text>
          </TouchableOpacity>
        </View>
        {type === "profile" &&
          allowEdit !== undefined &&
          allowEdit === true && (
            <Text style={postStyles.postMoreIconContainer}>
              <MoreDropdown
                options={options}
                text={"..."}
                textStyle={postStyles.postMoreIcon}
              />
            </Text>
          )}
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

      <View style={postStyles.postInteractionContainer}>
        <TouchableOpacity onPress={() => handleLikePost(item)}>
          <View style={postStyles.postInnerInteractionContainer}>
            <Image
              source={
                postLiked(item)
                  ? require("../../assets/icons/PostIcons/ActiveHeart.png")
                  : require("../../assets/icons/PostIcons/heart.png")
              }
              style={postStyles.postInteractionIcons}
            />
            <Text style={postStyles.postInteractionText}>
              {item.likes.length}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={postStyles.postInnerInteractionContainer}>
            <Image
              source={require("../../assets/icons/PostIcons/comment.png")}
              style={postStyles.postInteractionIcons}
            />
            <Text style={postStyles.postInteractionText}>
              {item.comments.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomPosts;
