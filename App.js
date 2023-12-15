// Use Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Imports
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Public Screens
import LoginScreen from "./app/screens/auth/LoginScreen";
import RegisterScreen from "./app/screens/auth/RegisterScreen";
import WelcomeScreen from "./app/screens/auth/WelcomeScreen";

// Authenticated Screens
import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";

// Custom Components
import NavigationBar from "./utils/NavigationBar";
import NavigationDrawer from "./utils/NavigationDrawer";

// Api And Utils
import authApi from "./axios/auth";

function AppContext() {
  const { isAuthenticated, login, logout } = useAuth();

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  SplashScreen.preventAutoHideAsync();

  const fetchData = async () => {
    try {
      const [userAuthenticated] = await Promise.all([
        authApi.isAuthenticated(),
      ]);

      if (userAuthenticated) {
        login();
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fontKeys = {
    PoppinsThin: "PoppinsThin",
    PoppinsRegular: "PoppinsRegular",
    PoppinsSemiBold: "PoppinsSemiBold",
    PoppinsBold: "PoppinsBold",
  };

  const [fontsLoaded, fontError] = useFonts({
    [fontKeys.PoppinsThin]: require("./assets/fonts/Poppins-Thin.ttf"),
    [fontKeys.PoppinsRegular]: require("./assets/fonts/Poppins-Regular.ttf"),
    [fontKeys.PoppinsSemiBold]: require("./assets/fonts/Poppins-SemiBold.ttf"),
    [fontKeys.PoppinsBold]: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome">
            {(props) => (
              <WelcomeScreen {...props} onLayoutRootView={onLayoutRootView} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} onLayoutRootView={onLayoutRootView} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Register">
            {(props) => (
              <RegisterScreen {...props} onLayoutRootView={onLayoutRootView} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <NavigationDrawer {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: "#0C356A",
            },
            header: ({ navigation }) => (
              <NavigationBar navigation={navigation} />
            ),
          }}
        >
          <Drawer.Screen name="Home">
            {(props) => (
              <HomeScreen {...props} onLayoutRootView={onLayoutRootView} />
            )}
          </Drawer.Screen>

          <Drawer.Screen name="Profile">
            {(props) => (
              <ProfileScreen {...props} onLayoutRootView={onLayoutRootView} />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

const App = () => (
  <AuthProvider>
    <AppContext />
  </AuthProvider>
);

export default App;
