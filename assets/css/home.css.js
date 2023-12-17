// Imports
import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#F7FAFF",
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
    paddingVertical: 5,
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

  homeHeaderContainer: {
    backgroundColor: "#0C356A",
    padding: 20,
    borderRadius: 6,
  },
  homeHeaderTitle: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    color: "#fff",
    marginBottom: 10,
  },
  homeHeaderSubtitle: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#fff",
    marginBottom: 15,
  },
});

export default homeStyles;
