// Imports
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Styles
import navStyles from "../../assets/css/navigation.css";

const NavigationBar = () => {
  const navigation = useNavigation();

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
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigationBar;
