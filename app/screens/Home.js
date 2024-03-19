import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { fetchDataWithCache } from "../utils/fetchCache";
import { API_ROUTES } from "../routes";
import { useApi } from "../hooks/api";
import { StatusBar } from "expo-status-bar";

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

const HomeScreen = () => {
  const { data, loading, refresh } = useApi({
    // url: "https://api.heinsoe.com",
    url: API_ROUTES.WEBSITE,
    cacheKey: "websites",
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        refreshing={loading}
        onRefresh={refresh}
        data={data}
        // onEndReached={}
        // onEndReachedThreshold={0.8}
        // ListFooterComponent={data && <ActivityIndicator/>}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
};

export default HomeScreen;
