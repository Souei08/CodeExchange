// Imports
import { StyleSheet } from "react-native";

const postStyles = StyleSheet.create({
  postsCards: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    padding: 30,
    marginVertical: 20,
  },

  postsOwnerProfile: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 20,
  },

  postsName: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
  },

  postsUsername: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    marginTop: -5,
    color: "#b4b4b4",
    textDecorationLine: "underline",
  },

  postsParagraph: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: "PoppinsRegular",
  },

  hashtagContainer: {
    marginBottom: 5,
  },

  postHashtags: {
    fontFamily: "PoppinsBold",
    fontSize: 11,
    color: "#fff",
    backgroundColor: "#0C356A",
    marginRight: 5,
    padding: 5,
    borderRadius: 5,
  },

  postInteractionContainer: {
    marginTop: 30,
    flexDirection: "row",
  },

  postInnerInteractionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginRight: 30,
  },

  postInteractionIcons: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: -3,
  },

  postInteractionText: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },

  postMoreIconContainer: {
    marginLeft: "auto",
    alignSelf: "flex-start",
    marginTop: -18,
  },

  postMoreIcon: {
    fontFamily: "PoppinsBold",
    fontSize: 32,
  },

  postDetailMainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  postDetailCommentContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
  },

  postDetailCommentCard: {},
});

export default postStyles;
