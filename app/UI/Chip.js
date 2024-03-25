import React from "react";
import { useColor } from "./color";
import { Pressable, Text, TouchableNativeFeedback, View } from "react-native";

function Chip({ children, avatar, onPress, style, mode }) {
  const { primaryColor, lightColor, dangerColor, warnningColor } = useColor();
  const color = {
    danger: dangerColor(0.7)[0],
    warnning: warnningColor(0.7)[0],
  };
  return (
    <View
      style={{
        backgroundColor: lightColor()[0],
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
            height: 28,
            paddingStart: avatar ? 4 : 8,
            paddingEnd: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {avatar && (
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 40,
                overflow: "hidden",
              }}
            >
              {avatar}
            </View>
          )}
          <Text style={mode && { color: color[mode] }}> {children}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default Chip;
