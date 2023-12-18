// Imports
import { StyleSheet } from "react-native";

const postStyles = StyleSheet.create({
  postsCards: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    padding: 20,
    marginVertical: 20,
    backgroundColor: "#fff",
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
    fontSize: 25,
  },

  postDetailMainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  postDetailCommentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },

  postDetailCommentCard: {
    flex: 1,
    borderRadius: 5,
    borderColor: "#CCCCCC",
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  postDetailCommentText: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },

  postDetailSendContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },

  postDetailSendInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  postDetailSendInput: {
    flex: 1,
    marginRight: 10,
    paddingTop: 5,
    borderRadius: 4,
    paddingLeft: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 15,
    marginBottom: 20,
    height: 60,
    color: "#000",
    fontFamily: "PoppinsRegular",
  },
});

export default postStyles;
