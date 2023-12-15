// Imports
import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    // paddingHorizontal: 40,
    backgroundColor: "#fff",
  },
  homeLogoName: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "PoppinsBold",
  },
  homeTitle: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    paddingHorizontal: 40,
  },

  homeCreateContainer: {
    paddingHorizontal: 40,
    marginVertical: 30,
  },

  homeCreateInput: {
    paddingTop: 5,
    borderRadius: 4,
    paddingLeft: 15,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    fontSize: 15,
    color: "#000",
    fontFamily: "PoppinsRegular",
    marginBottom: 10,
  },

  homeCreateButtonContainer: {
    backgroundColor: "#FFCD17",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    width: 130,
  },

  homeCreateButtonText: {
    color: "#000",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },

  postsCards: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 200,
    paddingHorizontal: 30,
    marginVertical: 20,

    // shadowColor: "#171717",
    // shadowOffset: { width: -100, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 1,
  },

  postsName: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginBottom: 20,
  },

  postsParagraph: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: "PoppinsRegular",
  },
});

export default homeStyles;
