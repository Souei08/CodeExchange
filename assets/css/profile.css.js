// Imports
import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  profileDetailsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 20,
    marginVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 50,
    marginHorizontal: 40,
  },

  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 10,
  },

  profileName: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },

  profileEmail: {
    fontFamily: "PoppinsBold",
    fontSize: 11,
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
