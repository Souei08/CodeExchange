// Imports
import React from "react";
import { View, Text } from "react-native";

// Styles
import toastStyles from "../../assets/css/toast.css";

const CustomToast = ({ message }) => {
  return (
    <View style={toastStyles.toastContainer}>
      <Text style={toastStyles.toastText}>{message}</Text>
    </View>
  );
};

export default CustomToast;
