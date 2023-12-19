// Imports
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import Tags from "react-native-tags";
import Toast from "react-native-toast-message";

// Styles
import postStyles from "../../assets/css/posts.css";
import homeStyles from "../../assets/css/home.css";
import formStyles from "../../assets/css/form.css";

// Custom Components
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import MoreDropdown from "./CustomMoreDropdown";

// Context
import { useAuth } from "../../context/AuthContext";

// Api
import postApi from "../../axios/posts";

// Utils
import { removeSpecialCharacters, showToast } from "../../utils/Utility";

// .env
import { apiHeader } from "@env";

const CustomPosts = ({ item, navigation, getPosts, loginUser }) => {
  const [isModalEdit, setModalEdit] = useState(false);
  const [isModalDelete, setModalDelete] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState(null);

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
    if (!postLiked(item)) {
      showToast("Post liked", "success");
    } else {
      showToast("Post unliked", "error");
    }

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

  const handleEditPost = async () => {
    if (!description) {
      showToast("Description must be provided.", "success");

      return false;
    }

    try {
      await postApi.editPosts(selectedPostId, description, tags);

      showToast("Post updated successfully.", "success");

      getPosts();
      closeModalEdit();
    } catch (error) {
      showToast("Error Message", error.message, "error");
      return;
    }
  };

  const handleDeletePost = async () => {
    try {
      await postApi.deletePosts(selectedPostId);

      showToast("Post deleted successfully.", "success");

      getPosts();
      closeModalEdit();
    } catch (error) {
      showToast(error.message, "error");
      return;
    }
  };

  const handleTagPress = (index, tagLabel, event, deleted) => {
    console.log(index, tagLabel, event, deleted);
  };

  const handleTagChange = (tags) => {
    setTags(tags);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleSelectedPosts = (item) => {
    setSelectedPostId(item._id);
    setDescription(item.description);
    setTags(item.hashtags);
  };

  const imageSource = item?.owner?.profileImage
    ? {
        uri: `${apiHeader}/${item?.owner?.profileImage}`,
      }
    : require("../../assets/images/default/defaultProfile.jpg");

  if (!item && Object.keys(item).length === 0) {
    return <Text>No post</Text>;
  }

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
        <Image source={imageSource} style={postStyles.postsOwnerProfile} />

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
              item={item}
              onPress={handleSelectedPosts}
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

        <TouchableOpacity onPress={() => handleItemClick(item)}>
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

        <Text style={formStyles.modalFormLabel}>Description:</Text>
        <TextInput
          style={formStyles.modalFormInput}
          placeholder="Enter your ideas"
          placeholderTextColor="#FFF"
          value={description}
          onChangeText={handleDescriptionChange}
          multiline={true}
          numberOfLines={10}
        />

        <Text style={formStyles.modalFormLabel}>Hashtags:</Text>
        <Tags
          style={{ marginBottom: 20 }}
          initialTags={tags}
          onChangeTags={handleTagChange}
          onTagPress={handleTagPress}
          containerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
          inputStyle={{
            backgroundColor: "#0C356A",
            borderRadius: 5,
            fontFamily: "PoppinsBold",
            borderWidth: 1,
            borderColor: "#fff",
            color: "#fff",
          }}
          tagTextStyle={{
            fontFamily: "PoppinsBold",
            color: "#000",
          }}
          tagContainerStyle={{
            fontFamily: "PoppinsBold",
            backgroundColor: "#FFC436",
            borderRadius: 8,
          }}
        />

        <CustomButton
          onPress={handleEditPost}
          buttonText={"Update Post"}
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
          Are you sure to delete this post?
        </Text>

        <CustomButton
          onPress={handleDeletePost}
          buttonText={"Delete"}
          ButtonTextStyle={homeStyles.homeCreateButtonText}
          buttonContainerStyle={[
            homeStyles.homeCreateButtonContainer,
            { width: "100%", marginBottom: 30 },
          ]}
        />
        <CustomButton
          onPress={closeModalDelete}
          buttonText={"Close"}
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
