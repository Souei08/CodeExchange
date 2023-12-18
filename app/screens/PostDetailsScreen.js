// Imports
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from "react-native";

// Styles
import postStyles from "../../assets/css/posts.css";

// Context
import { useAuth } from "../../context/AuthContext";

// Api
import postApi from "../../axios/posts";

// Storage
import storage from "../../utils/storage";

const PostDetailScreen = ({ navigation }) => {
  const { visitPost, setUserVisit } = useAuth();

  const [post, setPost] = useState([]);
  const [description, setDescription] = useState("");
  const [authUser, setAuthUser] = useState(null);

  const getAuthUser = async () => {
    const authUser = await storage.getAuthUser();
    setAuthUser(authUser);
  };

  const getOnePost = async () => {
    try {
      const onePost = await postApi.getOnePosts(visitPost._id);

      setPost(onePost);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getOnePost();
    getAuthUser();
  }, [visitPost]);

  const handleLikePost = async (post) => {
    await postApi.likePost(post._id);
    getOnePost();
  };

  const handleVisitUser = async (data) => {
    await setUserVisit(data);
    await navigation.navigate("Profile");
  };

  const handleHashtagClick = (hashtag) => {
    Alert.alert(`Hashtag Clicked: ${hashtag}`);
  };

  const handleItemClick = async (post) => {
    await setVisitPost(post);
    navigation.navigate("PostDetail");
  };

  const postLiked = (posts) => {
    return (
      posts?.likes?.filter((post) => post.user === authUser._id).length === 1
    );
  };

  const handleComment = async () => {
    if (!description) {
      return false;
    }

    try {
      const userAuthenticated = await postApi.commentPost(
        visitPost._id,
        description
      );

      Alert.alert(userAuthenticated.message);

      setDescription(null);
      getOnePost();
    } catch (error) {
      Alert.alert(error.message);
      return;
    }
  };

  return (
    <View style={postStyles.postDetailMainContainer}>
      <View style={[postStyles.postsCards]}>
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
              {post?.owner?.firstName + " " + post?.owner?.lastName}
            </Text>
            <TouchableOpacity onPress={() => handleVisitUser(post.owner)}>
              <Text style={postStyles.postsUsername}>
                @{post?.owner?.username}
              </Text>
            </TouchableOpacity>
          </View>

          {/* <Text style={postStyles.postMoreIconContainer}>
          <MoreDropdown
            options={options}
            text={"..."}
            textStyle={postStyles.postMoreIcon}
          />
        </Text> */}
        </View>

        <TouchableOpacity onPress={() => handleItemClick(post)}>
          <Text style={postStyles.postsParagraph}>{post?.description}</Text>

          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            {post?.hashtags?.map((hashtag) => (
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
          <TouchableOpacity onPress={() => handleLikePost(post)}>
            <View style={postStyles.postInnerInteractionContainer}>
              <Image
                source={
                  postLiked(post)
                    ? require("../../assets/icons/PostIcons/ActiveHeart.png")
                    : require("../../assets/icons/PostIcons/heart.png")
                }
                style={postStyles.postInteractionIcons}
              />
              <Text style={postStyles.postInteractionText}>
                {post?.likes?.length}
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
                {post?.comments?.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 170 }}>
        <ScrollView vertical>
          {post?.comments?.map((c) => (
            <View style={postStyles.postDetailCommentContainer} key={c._id}>
              <Image
                source={require("../../assets/images/default/defaultProfile.jpg")}
                style={postStyles.postsOwnerProfile}
              />
              <View style={postStyles.postDetailCommentCard}>
                <TouchableOpacity onPress={() => handleVisitUser(c.user)}>
                  <Text style={postStyles.postsName}>
                    {c?.user?.firstName + " " + c?.user?.lastName}
                  </Text>
                </TouchableOpacity>

                <Text style={postStyles.postDetailCommentText}>
                  {c.comment}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={postStyles.postDetailSendContainer}
        keyboardVerticalOffset={40}
      >
        <View style={postStyles.postDetailSendInnerContainer}>
          <TextInput
            style={postStyles.postDetailSendInput}
            placeholder="Comment"
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
            placeholderTextColor="#000"
          />
          <Button title="Send" onPress={handleComment} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PostDetailScreen;
