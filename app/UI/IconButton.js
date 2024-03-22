import React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useColor } from "./color";

function IconButton({ onPress, name, style }) {
  const { darkColor, lightColor } = useColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: lightColor(0.3)[0],
        padding: 8,
        height: 40,
        width: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        margin: 8,
        ...style,
      }}
    >
      <Icon size={20} name={name} />
    </TouchableOpacity>
  );
}

export default IconButton;
