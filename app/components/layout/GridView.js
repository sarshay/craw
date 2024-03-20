import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 3;
const COLUMN_WIDTH = width / COLUMN_COUNT;

const GridView = ({ children }) => {
  console.log({children})
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    height:'100%',
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // Align items to the start of the cross axis
  },
  column: {
    width: COLUMN_WIDTH,
    padding: 10,
    // Add additional styling as needed
  },
});

export default GridView;
