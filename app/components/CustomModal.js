// Imports
import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

// Styles
import modalStyles from "../../assets/css/modal.css";

const CustomModal = ({ isVisible, closeModal, children }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <TouchableOpacity
            smodalStyles
            onPress={closeModal}
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#FFCD17",
              paddingVertical: 5,
              borderRadius: 6,
              paddingHorizontal: 15,
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <Text style={{ textAlign: "center" }}>X</Text>
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
