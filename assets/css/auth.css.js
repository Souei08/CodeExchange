// Imports
import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0C356A",
    paddingHorizontal: 60,
  },

  authHeader: {
    fontFamily: "PoppinsBold",
    fontSize: 35,
    textAlign: "left",
    marginBottom: 10,
    color: "#fff",
  },
  authSubHeader: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    textAlign: "left",
    color: "#fff",
  },

  authParagraph: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    textAlign: "left",
    color: "#fff",
  },

  authInputs: {
    paddingTop: 5,
    borderRadius: 4,
    paddingLeft: 15,
    borderColor: "#fff",
    borderWidth: 1,
    fontSize: 15,
    marginBottom: 20,
    height: 40,
    color: "#fff",
    fontFamily: "PoppinsRegular",
  },

  authButtonContainer: {
    backgroundColor: "#FFCD17",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 20,
    width: 150,
  },

  authButtonText: {
    color: "#000",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
});

export default authStyles;
