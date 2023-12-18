// Imports
import { StyleSheet } from "react-native";

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#0C356A",
    padding: 20,
    borderRadius: 10,
  },

  modalCreateButtonContainer: {
    marginBottom: 20,
    backgroundColor: "#FFCD17",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
  },

  modalCreateButtonText: {
    color: "#000",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
});

export default modalStyles;
