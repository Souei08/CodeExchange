// Imports
import { StyleSheet } from "react-native";

const drawerStyles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  drawerLogoName: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "PoppinsBold",
  },
  drawerNavsContainer: {
    paddingVertical: 30,
  },
  drawerNavs: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    fontFamily: "PoppinsBold",
  },
  activeNav: {
    color: "#FFCD17",
  },
  drawerProfileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    marginTop: "auto",
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  drawerProfilePicture: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  drawerProfileName: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
  drawerProfileEmail: {
    fontSize: 11,
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
});

export default drawerStyles;
