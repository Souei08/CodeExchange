// Imports
import { StyleSheet } from "react-native";

const searchStyles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: "#F7FAFF",
    paddingVertical: 20,
  },

  searchInnerContainer: {
    paddingHorizontal: 40,
  },

  searchTitle: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
  },

  searchInput: {
    padding: 10,
    borderRadius: 6,
    borderColor: "#000",
    borderWidth: 1,
    fontSize: 14,
    marginBottom: 20,
    color: "#000",
    fontFamily: "PoppinsRegular",
  },
});

export default searchStyles;
