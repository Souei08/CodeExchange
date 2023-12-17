// Imports
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// Styles
import postStyles from "../../assets/css/posts.css";

// Context
import { useAuth } from "../../context/AuthContext";

const PostDetailScreen = ({}) => {
  const { visitPost } = useAuth();

  // const postLiked = (item) => {
  //   return (
  //     item.likes.filter((item) => item.user === loginUser._id).length === 1
  //   );
  // };

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
              {visitPost?.owner?.firstName + " " + visitPost?.owner?.lastName}
            </Text>
            <TouchableOpacity onPress={() => handleVisitUser(visitPost)}>
              <Text style={postStyles.postsUsername}>
                @{visitPost?.owner?.username}
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

        <TouchableOpacity onPress={() => handleItemClick(visitPost)}>
          <Text style={postStyles.postsParagraph}>
            {visitPost?.description}
          </Text>

          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            {visitPost.hashtags.map((hashtag) => (
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
          <TouchableOpacity onPress={() => handleLikePost(visitPost)}>
            <View style={postStyles.postInnerInteractionContainer}>
              <Image
                // source={
                //   postLiked(visitPost)
                //     ? require("../../assets/icons/PostIcons/ActiveHeart.png")
                //     : require("../../assets/icons/PostIcons/heart.png")
                // }
                source={require("../../assets/icons/PostIcons/heart.png")}
                style={postStyles.postInteractionIcons}
              />
              <Text style={postStyles.postInteractionText}>
                {visitPost.likes.length}
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
                {visitPost.comments.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {visitPost.comments.map((visitPost) => (
        <View style={postStyles.postDetailCommentContainer}>
          <Image
            source={require("../../assets/images/default/defaultProfile.jpg")}
            style={postStyles.postsOwnerProfile}
          />
          <View style={postStyles.postDetailCommentCard}>
            <TouchableOpacity onPress={() => handleVisitUser(visitPost)}>
              <Text style={postStyles.postsName}>
                {visitPost?.owner?.firstName + " " + visitPost?.owner?.lastName}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PostDetailScreen;
