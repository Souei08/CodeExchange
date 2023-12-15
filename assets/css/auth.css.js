// Imports
import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0C356A",
    paddingHorizontal: 50,
  },

  authLogoContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  authLogo: {
    width: 60,
    height: 60,
  },

  authLogoText: {
    fontFamily: "PoppinsBold",
    fontSize: 32,
    color: "#fff",
  },

  authHeader: {
    fontFamily: "PoppinsBold",
    fontSize: 35,
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
    paddingVertical: 5,
    paddingHorizontal: 10,
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

  authRegisterText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
});

export default authStyles;
