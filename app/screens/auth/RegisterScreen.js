// Imports
import React, { useState } from "react";
import { View, Text, TextInput, Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Styles
import authStyles from "../../../assets/css/auth.css";

// Components
import CustomButton from "../../components/CustomButton";

// Api
import authApi from "../../../axios/auth";

const RegisterScreen = ({ navigation, onLayoutRootView }) => {
  const [formData, setFormData] = useState([
    { id: "1", placeholder: "First Name", value: "", key: "firstName" },
    { id: "2", placeholder: "Last Name", value: "", key: "lastName" },
    { id: "3", placeholder: "Username", value: "", key: "username" },
    { id: "4", placeholder: "Email", value: "", key: "email" },
    {
      id: "5",
      placeholder: "Password",
      value: "",
      secureTextEntry: true,
      key: "password",
    },
  ]);

  const renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
      }}
    >
      <TextInput
        style={authStyles.authInputs}
        placeholder={item.placeholder}
        onChangeText={(text) => handleInputChange(item.id, text)}
        value={item.value}
        secureTextEntry={item.secureTextEntry}
        placeholderTextColor="#fff"
      />
    </View>
  );

  const handleInputChange = (id, text) => {
    setFormData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, value: text } : item))
    );
  };

  const convertFormDataToObject = (formData) => {
    return formData.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  };

  const handleSubmit = async () => {
    const formDataObject = convertFormDataToObject(formData);

    const { firstName, lastName, email, password } = formDataObject;

    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Please provide all the input fields");
      return false;
    }

    try {
      const userAuthenticated = await authApi.register(formDataObject);
      Alert.alert(userAuthenticated.message);
      navigation.navigate("Login");

      setFormData([
        { id: "1", placeholder: "First Name", value: "", key: "firstName" },
        { id: "2", placeholder: "Last Name", value: "", key: "lastName" },
        {
          id: "3",
          placeholder: "Password",
          value: "",
          secureTextEntry: true,
          key: "password",
        },
        { id: "4", placeholder: "Email", value: "", key: "email" },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
      return;
    }
  };

  const handleNavigateLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={authStyles.authContainer} onLayout={onLayoutRootView}>
      <Text
        style={[
          authStyles.authHeader,
          { marginBottom: 30, alignSelf: "center" },
        ]}
      >
        Register
      </Text>

      <View>
        <FlatList
          data={formData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />

        <CustomButton
          onPress={handleSubmit}
          buttonText={"Register"}
          buttonContainerStyle={[
            authStyles.authButtonContainer,
            { width: "100%", marginBottom: 5, marginTop: 0 },
          ]}
          ButtonTextStyle={authStyles.authButtonText}
        />

        <TouchableOpacity onPress={handleNavigateLogin}>
          <Text style={authStyles.authRegisterText}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
