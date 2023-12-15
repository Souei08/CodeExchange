// Imports
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Styles
import drawerStyles from "../assets/css/drawer.css";

// Api And Context
import { useAuth } from "../context/AuthContext";
import storage from "./storage";

const NavigationDrawer = ({ navigation }) => {
  const { logout } = useAuth();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await storage.getAuthUser();
        setAuthUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    await storage.clearToken();
    await logout();
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0C356A", flex: 1 }}>
      <View style={drawerStyles.drawerContainer}>
        <Text style={drawerStyles.drawerLogoName}>
          Code<Text style={{ color: "#FFCD17" }}>Ideas</Text>
        </Text>

        <View style={drawerStyles.drawerNavsContainer}>
          <Text
            style={drawerStyles.drawerNavs}
            onPress={() => handleNavigation("Home")}
          >
            Home
          </Text>
          <Text
            style={drawerStyles.drawerNavs}
            onPress={() => handleNavigation("Profile")}
          >
            Profile
          </Text>
          <Text style={drawerStyles.drawerNavs} onPress={handleLogout}>
            Logout
          </Text>
        </View>

        <View style={drawerStyles.drawerProfileContainer}>
          <Image
            source={require("../assets/images/default/defaultProfile.jpg")}
            style={drawerStyles.drawerProfilePicture}
          />

          <View>
            <Text style={drawerStyles.drawerProfileName}>
              {authUser?.firstName + " " + authUser?.lastName}
            </Text>
            <Text style={drawerStyles.drawerProfileEmail}>
              {authUser?.email}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigationDrawer;
