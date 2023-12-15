// Imports
import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  profileDetailsContainer: {
    display: "flex",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 20,
    marginVertical: 30,
    borderRadius: 5,
    paddingHorizontal: 30,
    marginHorizontal: 40,
  },

  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 20,
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
    marginTop: 20,
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
  },

  profileTitle: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    paddingHorizontal: 40,
  },
});

export default profileStyles;
