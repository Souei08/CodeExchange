// Imports
import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: "#fff",
  },

  profileDetailsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 20,
    marginVertical: 20,
    borderRadius: 5,
  },

  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 10,
    marginBottom: 20,
  },

  profileName: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },

  profileEmail: {
    fontFamily: "PoppinsBold",
    fontSize: 11,
  },

  profileTitle: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
  },

  //   postsProfileCards: {
  //     display: "flex",
  //     justifyContent: "center",
  //     borderRadius: 5,
  //     borderColor: "#D9D9D9",
  //     borderWidth: 2,
  //     height: 200,
  //     paddingHorizontal: 30,
  //     marginVertical: 20,
  //   },

  //   postsProfileName: {
  //     fontSize: 18,
  //     fontFamily: "PoppinsBold",
  //     marginBottom: 20,
  //   },

  //   postsProfileParagraph: {
  //     fontSize: 14,
  //     marginVertical: 5,
  //     fontFamily: "PoppinsRegular",
  //   },
});

export default profileStyles;
