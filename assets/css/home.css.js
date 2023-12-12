// Imports
import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingHorizontal: 40,
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
  },

  homeCreateContainer: {
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
    borderColor: "#D9D9D9",
    borderWidth: 2,
    height: 200,
    paddingHorizontal: 30,
    marginVertical: 20,
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
