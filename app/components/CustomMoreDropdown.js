// Imports
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const MoreDropdown = ({ options, text, textStyle, editModal, deleteModal }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionClick = (option) => {
    if (option === "Edit") {
      editModal();
      toggleModal();
    } else {
      deleteModal();
      toggleModal();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleOptionClick(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  option: {
    paddingVertical: 10,
  },
});

export default MoreDropdown;
