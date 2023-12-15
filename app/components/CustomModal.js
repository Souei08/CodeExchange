import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const CustomModal = ({ isVisible, closeModal, children }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#0C356A",
    padding: 20,
    borderRadius: 10,
  },
});

export default CustomModal;
