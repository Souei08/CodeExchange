// Imports
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

// Styles
import postStyles from "../../assets/css/posts.css";
import homeStyles from "../../assets/css/home.css";

// Custom Components
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import MoreDropdown from "./CustomMoreDropdown";

// Context
import { useAuth } from "../../context/AuthContext";

// Api
import postApi from "../../axios/posts";

// Utils
import { removeSpecialCharacters } from "../../utils/Utility";

const CustomPosts = ({ item, navigation, getPosts, loginUser }) => {
  const [isModalEdit, setModalEdit] = useState(false);
  const [isModalDelete, setModalDelete] = useState(false);

  const { setUserVisit, setVisitPost, setSearchValue } = useAuth();
  const options = ["Edit", "Delete"];

  const openModalEdit = () => {
    setModalEdit(true);
  };

  const closeModalEdit = () => {
    setModalEdit(false);
  };

  const openModalDelete = () => {
    setModalDelete(true);
  };

  const closeModalDelete = () => {
    setModalDelete(false);
  };

  const handleVisitUser = async (item) => {
    await setUserVisit(item.owner);
    await navigation.navigate("Profile");
  };

  const handleLikePost = async (item) => {
    await postApi.likePost(item._id);
    getPosts();
  };

  const handleHashtagClick = async (hashtag) => {
    const result = removeSpecialCharacters(hashtag);
    await setSearchValue(result);
    await navigation.navigate("Search");
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
        {loginUser._id === item.owner._id && (
          <Text style={postStyles.postMoreIconContainer}>
            <MoreDropdown
              options={options}
              text={"..."}
              textStyle={postStyles.postMoreIcon}
              editModal={openModalEdit}
              deleteModal={openModalDelete}
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

      <CustomModal isVisible={isModalEdit} closeModal={closeModalEdit}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "PoppinsBold",
            color: "#fff",
            fontSize: 18,
            marginBottom: 20,
          }}
        >
          Update Post
        </Text>

        <CustomButton
          // onPress={handleCreatePost}
          buttonText={"Post"}
          ButtonTextStyle={homeStyles.homeCreateButtonText}
          buttonContainerStyle={[
            homeStyles.homeCreateButtonContainer,
            { width: "100%", marginBottom: 30 },
          ]}
        />
      </CustomModal>

      <CustomModal isVisible={isModalDelete} closeModal={closeModalDelete}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "PoppinsBold",
            color: "#fff",
            fontSize: 18,
            marginBottom: 20,
          }}
        >
          Delete Post
        </Text>

        <CustomButton
          // onPress={handleCreatePost}
          buttonText={"Post"}
          ButtonTextStyle={homeStyles.homeCreateButtonText}
          buttonContainerStyle={[
            homeStyles.homeCreateButtonContainer,
            { width: "100%", marginBottom: 30 },
          ]}
        />
      </CustomModal>
    </View>
  );
};

export default CustomPosts;
