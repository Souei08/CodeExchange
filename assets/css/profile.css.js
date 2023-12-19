// Imports
import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#F7FAFF",
  },

  profileDetailsContainer: {
    display: "flex",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 20,
    marginVertical: 30,
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: "#fff",
  },

  // profilePicture: {
  //   width: 70,
  //   height: 70,
  //   borderRadius: 10,
  //   marginRight: 20,
  // },

  profileEditIcon: {
    borderRadius: 5,
    padding: 5,
    marginLeft: "auto",
    alignSelf: "flex-start",
  },

  profileName: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },

  profileEmail: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    marginTop: -5,
    color: "#b4b4b4",
  },

  profileBios: {
    marginTop: 30,
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
  },

  profileTitle: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    paddingHorizontal: 40,
  },

  profilePostCountContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#FFCD17",
    width: "50%",
  },

  profilePostCountText: {
    fontFamily: "PoppinsBold",
    color: "#000",
    fontSize: 18,
  },

  profileEditImageContainer: {
    position: "relative",
    alignSelf: "center",
  },

  profileIconContainer: {
    position: "absolute",
    top: 0,
    right: 10,
    zIndex: 1,
    backgroundColor: "#0174BE",
    borderRadius: 100,
    padding: 5,
  },
  profileEditImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 20,
  },
});

export default profileStyles;
