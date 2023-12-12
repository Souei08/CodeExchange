// Imports
import { Text, TouchableOpacity } from "react-native";

export default function CustomButton({
  onPress,
  buttonText,
  ButtonTextStyle,
  buttonContainerStyle,
}) {
  return (
    <TouchableOpacity style={[buttonContainerStyle]} onPress={onPress}>
      <Text style={[ButtonTextStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
}
