import React from "react";
import { useColor } from "./color";
import { Pressable, Text, TouchableNativeFeedback, View } from "react-native";

function Chip({ children, avatar, onPress, style }) {
  const { primaryColor, lightColor } = useColor();
  return (
    <View
      style={{
        backgroundColor: primaryColor(0.7)[0],
        borderRadius: 50,
        overflow: "hidden",
        ...style,
      }}
    >
      <TouchableNativeFeedback onPress={onPress}>
        <View
          style={{
            flex: 1,
            padding: 4,
            paddingStart: 10,
            paddingEnd: 10,
          }}
        >
          {avatar && <View>{avatar}</View>}
          <Text style={{ color: lightColor()[0] }}> {children}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default Chip;
