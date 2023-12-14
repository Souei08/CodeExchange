// Imports
import { Button, Text, View } from "react-native";
import "react-native-gesture-handler";
import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

SplashScreen.preventAutoHideAsync();

function App() {
  const isLoggedIn = false;

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

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Welcome" options={{ headerShown: false }}>
            {(props) => (
              <WelcomeScreen {...props} onLayoutRootView={onLayoutRootView} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen {...props} onLayoutRootView={onLayoutRootView} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Register" options={{ headerShown: false }}>
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

export default App;
