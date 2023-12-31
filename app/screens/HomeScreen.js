//  Imports
import Tags from "react-native-tags";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TextInput, View } from "react-native";

// Styles
import homeStyles from "../../assets/css/home.css";
import formStyles from "../../assets/css/form.css";

// Components
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";

// Api
import postApi from "../../axios/posts";
import CustomPosts from "../components/CustomPosts";

// Utils
import storage from "../../utils/storage";
import { showToast } from "../../utils/Utility";

const HomeScreen = ({ navigation, onLayoutRootView }) => {
  // const toast = useToast();

  const [isModalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState(null);
  const [authUser, setAuthUser] = useState([]);

  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getPosts = async () => {
    try {
      const posts = await postApi.getAllPosts();

      setPosts(posts);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getAuthUser = async () => {
    const authUser = await storage.getAuthUser();
    setAuthUser(authUser);
  };

  // const handleTagPress = (index, tagLabel, event, deleted) => {
  //   console.log(index, tagLabel, event, deleted);
  // };

  const handleTagChange = (tags) => {
    setTags(tags);
  };

  useEffect(() => {
    getPosts();
    getAuthUser();
  }, [navigation]);

  const renderItem = ({ item }) => (
    <CustomPosts
      item={item}
      navigation={navigation}
      getPosts={getPosts}
      loginUser={authUser}
    />
  );

  const handleCreatePost = async () => {
    if (!description) {
      showToast("Description must be provided.", "success");

      return false;
    }

    try {
      await postApi.createPosts(description, tags);

      showToast("Post created successfully.", "success");

      setTags([]);
      setDescription(null);
      closeModal();
      getPosts();
    } catch (error) {
      showToast(error.message, "error");
      return;
    }
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  return (
    <View style={homeStyles.homeContainer} onLayout={onLayoutRootView}>
      <View style={homeStyles.homeCreateContainer}>
        <View style={homeStyles.homeHeaderContainer}>
          <Text style={homeStyles.homeHeaderTitle}>
            Welcome, {authUser.firstName} {authUser.lastName}
          </Text>
          <Text style={homeStyles.homeHeaderSubtitle}>
            Start posting your ideas now and let the coding adventure begin!
          </Text>

          <CustomButton
            buttonText={"Create Posts"}
            ButtonTextStyle={homeStyles.homeCreateButtonText}
            buttonContainerStyle={homeStyles.homeCreateButtonContainer}
            onPress={openModal}
          />
        </View>

        <CustomModal isVisible={isModalVisible} closeModal={closeModal}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PoppinsBold",
              color: "#fff",
              fontSize: 18,
              marginBottom: 20,
            }}
          >
            Create Post
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
            // onTagPress={handleTagPress}
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
            onPress={handleCreatePost}
            buttonText={"Post"}
            ButtonTextStyle={homeStyles.homeCreateButtonText}
            buttonContainerStyle={[
              homeStyles.homeCreateButtonContainer,
              { width: "100%", marginBottom: 30 },
            ]}
          />
        </CustomModal>
      </View>

      <Text style={homeStyles.homeTitle}>Posts</Text>

      <FlatList
        data={posts}
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

export default HomeScreen;
