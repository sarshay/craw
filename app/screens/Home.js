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
} from "react-native";
import { Badge, Card, Chip } from "react-native-paper";
import { API_ROUTES } from "../routes";
import { useApi } from "../hooks/api";
import { StatusBar } from "expo-status-bar";
import GeneralContext from "../providers/GeneralProviter";
import MyStatusBar from "./../components/MyStatusBar";
import _ from "lodash";

const { StatusBarManager } = NativeModules;

const HomeScreen = ({ navigation }) => {
  const {
    websites: w,
    websitesLoading,
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
      const filtered = w.filter((item) =>
        item.name.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilteredResults(filtered);
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
          zIndex: 10,
          borderRadius: 40,
          padding: 8,
          paddingRight: 16,
          paddingLeft: 16,
          shadowRadius: 60,
        }}
      >
        <TextInput placeholder="Search Channel" onChangeText={setSearchWord} />
      </Card>
      <ScrollView>
        <MyStatusBar autoHeight />
        <View style={{ height: 80 }} />
        <Text>Popular</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {websites?.map((w) => {
            const is18 = w.is18Plus == "yes";
            return (
              <Chip
                key={w.id}
                rippleColor={is18 && "#ff0000"}
                style={{
                  margin: 8,
                  ...(is18 && { backgroundColor: "#ff000022" }),
                }}
                avatar={
                  w.site_icon_url && <Image source={{ uri: w.site_icon_url }} />
                }
                onPress={() => goToChannelScreen(w.id)}
              >
                {w.name}
                {is18 && "(18+)"}
              </Chip>
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
                  const is18 = w.is18Plus == "yes";
                  return (
                    <Chip
                      key={w.id}
                      rippleColor={is18 && "#ff0000"}
                      style={{
                        margin: 8,
                        ...(is18 && { backgroundColor: "#ff000022" }),
                      }}
                      avatar={
                        w.site_icon_url && (
                          <Image source={{ uri: w.site_icon_url }} />
                        )
                      }
                      onPress={() => goToChannelScreen(w.id)}
                    >
                      {w.name}
                      {is18 && "(18+)"}
                    </Chip>
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
