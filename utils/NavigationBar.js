// Imports
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image } from "react-native";

// Styles
import navStyles from "../assets/css/navigation.css";

const NavigationBar = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0C356A" }}>
      <View style={navStyles.navContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={navStyles.navLogoName}>CodeExchange</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openDrawer}>
          <Image
            source={require("../assets/icons/NavigationIcons/hamburger.png")}
            style={navStyles.navBurger}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigationBar;
