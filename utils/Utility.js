import Toast from "react-native-toast-message"; // Make sure to import Toast

function removeSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
}

function showToast(text2, type) {
  Toast.show({
    text2: text2,
    type: type,
    position: "top",
    text2Style: {
      fontSize: 14,
      fontFamily: "PoppinsRegular",
      color: "#000",
    },
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: "green", // Customize the toast background color
    zIndex: 1000, // Customize the zIndex
  });
}

function validateEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}

export { removeSpecialCharacters, showToast, validateEmail };
