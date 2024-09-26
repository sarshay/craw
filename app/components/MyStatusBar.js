import React from "react";
import { StatusBar } from "expo-status-bar";
import { NativeModules, View } from "react-native";
const { StatusBarManager } = NativeModules;
function MyStatusBar({ isDark = true, autoHeight = false }) {
  return (
    <View style={autoHeight && { marginTop: StatusBarManager.HEIGHT }}>
      <StatusBar style={isDark ? "dark" : "light"} />
    </View>
  );
}

export default MyStatusBar;
