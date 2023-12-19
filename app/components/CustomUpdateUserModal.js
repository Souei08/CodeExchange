// Imports
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Alert } from "react-native";

// Custom Components
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";

// Styles
import authStyles from "../../assets/css/auth.css";
import modalStyles from "../../assets/css/modal.css";

// Api
import usersApi from "../../axios/users";

const CustomUpdateUserModal = ({
  updateModalProf,
  closeModalUpdateProf,
  user,
  getUser,
}) => {
  const [formData, setFormData] = useState([
    {
      id: "1",
      placeholder: "First Name",
      value: user.firstName,
      key: "firstName",
    },
    {
      id: "2",
      placeholder: "Last Name",
      value: user.lastName,
      key: "lastName",
    },
    {
      id: "3",
      placeholder: "Username",
      value: user.username,
      key: "username",
    },
    { id: "4", placeholder: "Email", value: user.email, key: "email" },
    {
      id: "5",
      placeholder: "Password",
      value: "",
      secureTextEntry: true,
      key: "password",
    },
    {
      id: "6",
      placeholder: "Confirm Password",
      value: "",
      secureTextEntry: true,
      key: "confirmPassword",
    },
    {
      id: "7",
      placeholder: "Bio",
      value: user.bio,
      key: "bio",
    },
  ]);

  useEffect(() => {
    setFormData((prevFormData) =>
      prevFormData.map((field) => {
        if (field.key === "password" || field.key === "confirmPassword") {
          return {
            ...field,
            value: "",
          };
        }

        return {
          ...field,
          value: user[field.key],
        };
      })
    );
  }, [user]);

  const renderInputItems = ({ item }) => (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <TextInput
        style={authStyles.authInputs}
        placeholder={item.placeholder}
        onChangeText={(text) => handleInputChange(item.id, text)}
        value={item.value}
        secureTextEntry={item.secureTextEntry}
        placeholderTextColor="#ccc"
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

  const handleUpdateProfile = async () => {
    const formDataObject = convertFormDataToObject(formData);

    const {
      firstName,
      lastName,
      email,
      password,
      bio,
      username,
      confirmPassword,
    } = formDataObject;

    if (!firstName || !lastName || !email || !username) {
      Alert.alert("Full name, email and username are required");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password must be similar.");
      return false;
    }

    const newForm = {
      firstName,
      lastName,
      bio,
      email,
      username,
    };

    if (password && confirmPassword) {
      newForm.password = password;
    }

    try {
      const userAuthenticated = await usersApi.updateProfile(user._id, newForm);
      Alert.alert(userAuthenticated.message);

      setFormData([
        {
          id: "1",
          placeholder: "First Name",
          value: user.firstName,
          key: "firstName",
        },
        {
          id: "2",
          placeholder: "Last Name",
          value: user.lastName,
          key: "lastName",
        },
        {
          id: "3",
          placeholder: "Username",
          value: user.username,
          key: "username",
        },
        { id: "4", placeholder: "Email", value: user.email, key: "email" },
        {
          id: "5",
          placeholder: "Password",
          value: "",
          secureTextEntry: true,
          key: "password",
        },
        {
          id: "6",
          placeholder: "Confirm Password",
          value: "",
          secureTextEntry: true,
          key: "confirmPassword",
        },
        {
          id: "7",
          placeholder: "Bio",
          value: user.bio,
          key: "bio",
        },
      ]);

      getUser();
      closeModalUpdateProf();
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
      return;
    }
  };

  return (
    <CustomModal isVisible={updateModalProf} closeModal={closeModalUpdateProf}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "PoppinsBold",
          color: "#fff",
          fontSize: 18,
          marginBottom: 20,
        }}
      >
        Update Profile
      </Text>

      <FlatList
        data={formData}
        renderItem={renderInputItems}
        keyExtractor={(item) => item?.id?.toString()}
        numColumns={2}
      />

      <CustomButton
        onPress={handleUpdateProfile}
        buttonText={"Update"}
        ButtonTextStyle={modalStyles.modalCreateButtonText}
        buttonContainerStyle={modalStyles.modalCreateButtonContainer}
      />
    </CustomModal>
  );
};

export default CustomUpdateUserModal;
