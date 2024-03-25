import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  NativeModules,
  Image,
  TextInput,
  RefreshControl,
  VirtualizedList,
} from "react-native";
import { API_ROUTES } from "../constant";
import { useApi } from "../hooks/api";
import { StatusBar } from "expo-status-bar";
import GeneralContext from "../providers/GeneralProviter";
import MyStatusBar from "./../components/MyStatusBar";
import _ from "lodash";
import Card from "../UI/Card";
import Chip from "../UI/Chip";
import appConfig from "../app.config";
import Channel from "../components/Channel";

const { StatusBarManager } = NativeModules;

const HomeScreen = ({ navigation }) => {
  const {
    websites: w,
    websitesLoading,
    refreshWebsites,
    category,
    categoryLoading,
  } = useContext(GeneralContext);
  const goToChannelScreen = (id) => {
    navigation.navigate("Channel", { id });
  };
  const [searchWord, setSearchWord] = useState("");
  const [websites, setFilteredResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (w) {
        const filtered = w?.filter((item) =>
          item.name.toLowerCase().includes(searchWord.toLowerCase())
        );
        setFilteredResults(filtered);
      }
    }, 200); // Adjust the debounce delay as needed
    return () => clearTimeout(delayDebounceFn);
  }, [searchWord, w]);
  return (
    <SafeAreaView>
      <Card
        style={{
          position: "absolute",
          top: 48,
          right: 16,
          left: 16,
          zIndex: 1,
          borderRadius: 40,
          padding: 8,
          paddingRight: 16,
          paddingLeft: 16,
          shadowRadius: 60,
        }}
      >
        <TextInput placeholder="Search Channel" onChangeText={setSearchWord} />
      </Card>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={websitesLoading}
            onRefresh={refreshWebsites}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <MyStatusBar autoHeight />
        <View style={{ height: 80 }} />
        <View style={{ alignItems: "center" }}>
          <Text>Popular</Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {websites?.map((w) => {
            return (
              <View key={w.id} style={{ margin: 8, width: 180 }}>
                <Channel.Card
                  key={w.id}
                  {...w}
                  onPress={() => goToChannelScreen(w.id)}
                />
              </View>
            );
          })}
        </ScrollView>
        {category?.map((item) => (
          <View style={{ marginTop: 16 }} key={item.id}>
            <View style={{ alignItems: "center" }}>
              <Text>{item.name}</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {w
                ?.filter((a) => a.category_ids?.split(",").includes(item.id))
                .map((w) => {
                  return (
                    <Channel
                      key={w.id}
                      {...w}
                      onPress={() => goToChannelScreen(w.id)}
                    />
                  );
                })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
