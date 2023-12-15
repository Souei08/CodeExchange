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
});

export default postStyles;
