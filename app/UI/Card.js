import React from "react";
import {
  View,
  useColorScheme,
  StyleSheet,
  Platform,
  Text,
  Image,
} from "react-native";
import { useColor } from "./color";
import { TouchableNativeFeedback } from "react-native";
function Card({ children, style, onPress, body }) {
  const { bgColor, textColor, darkColor } = useColor();
  return (
    <View
      style={{
        backgroundColor: bgColor()[0],
        textColor: textColor()[0],
        // width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        flex: 1,
        ...Platform.select({
          ios: {
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          },
          android: {
            elevation: 4,
          },
        }),
        ...style,
      }}
    >
      <TouchableNativeFeedback onPress={onPress}>
        <View style={{ flex: 1 }}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default Card;

Card.Content = ({ children, style }) => (
  <View style={{ padding: 16, flex: 1, ...style }}>{children}</View>
);
Card.Cover = ({ source }) => (
  <View>
    <Image
      style={{ borderRadius: 16, flex: 1, height: 200, width: "100%" }}
      source={source}
    />
  </View>
);
Card.Title = ({ title, subtitle, right, left, style }) => (
  <View
    style={{
      padding: 16,
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      ...style,
    }}
  >
    {left}
    <View style={{ flex: 1 }}>
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
    </View>
    {right && right()}
  </View>
);
