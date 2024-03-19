import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { API_ROUTES } from "../routes";
import { useApi } from "../hooks/api";
import { StatusBar } from "expo-status-bar";
import WebsiteContext from "../providers/WebsiteProvider";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const HomeScreen = ({navigation}) => {
  const { websites, websitesLoading } = useContext(WebsiteContext);
  const goToChannelScreen = (id) => {
    navigation.navigate("ChannelScreen", { id });
  };
  return (
    <View style={styles.container}>
      <FlatList
        refreshing={websitesLoading}
        // onRefresh={refresh}
        data={websites}
        // onEndReached={}
        // onEndReachedThreshold={0.8}
        // ListFooterComponent={data && <ActivityIndicator/>}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text onPress={() => goToChannelScreen(item.id)} style={styles.item}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
};

export default HomeScreen;
