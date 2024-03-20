import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { API_ROUTES } from "../routes";
import { useApi } from "../hooks/api";
import { StatusBar } from "expo-status-bar";
import GeneralContext from "../providers/GeneralProviter";
import wpScan, { findImage } from "../utils/wpScan";
import { Appbar, Card, IconButton } from "react-native-paper";
import WebView from "react-native-webview";
import HTMLView from "react-native-htmlview";
import { cleanHtmlTags } from "../utils/function";
import MyStatusBar from "../components/MyStatusBar";

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    margin: 6,
  },
  item: {
    flex: 0.5,
    margin: 6,
  },
  title: {
    marginTop: 12,
  },
});

const SearchScreen = ({ route, navigation }) => {
  const { website } = route.params;
  useEffect(() => {
    // Define the title after component rendering
    navigation.setOptions({
      title: website?.name,
      headerRight: () => (
        <IconButton
          onPress={() => navigation.navigate("Search", { website })}
          icon={"magnify"}
        />
      ),
    });
  }, [navigation]);
  if (website) {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoadig] = useState(false);
    const [message, setMessage] = useState(false);

    const [posts, setPosts] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    // let _category = query.get("categories") ? `&categories=${query.get("categories")}` : ``;
    const wp = wpScan({
      wpUrl: website?.url,
      api_base_path: website?.api_base_path,
    });
    useEffect(() => {
      setHasMore(true);
    }, [searchWord]);
    const loadMore = () => {
      if (!hasMore || loading || searchWord == "") return;
      setLoadig(true);
      console.log("Page load" + page);
      wp.getPost({
        page: page,
        search: searchWord,
      })
        .then((data) => {
          // console.log(data);
          setPosts((old) => [...old, ...data]);
          // setHasMore(false);
          setPage((pre) => pre + 1);
        })
        .catch((error_) => {
          setHasMore(false);
          // console.error({ error_ });
          //   messageAPi.error(error?.message);
          // setWpError(error?.message)
        })
        .finally(() => {
          setLoadig(false);
        });
    };
    const handleSeaarch = () => {
      setPosts([]);
      setPage(1);
      loadMore();
    };
    return (
      <>
        <MyStatusBar autoHeight />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            icon={"arrow-left"}
            size={26}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 6,
              backgroundColor: "#99999922",
              borderRadius: 32,
              alignItems: "center",
              paddingLeft: 16,
              paddingEnd: 16,
              marginEnd: 16,
            }}
          >
            <TextInput
              onSubmitEditing={handleSeaarch}
              style={{
                flex: 1,
              }}
              onChangeText={setSearchWord}
              placeholder="Search"
              autoFocus
            />
          </View>
        </View>
        <FlatList
          style={styles.container}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          horizontal={false}
          //   refreshing={loading}
          //   onRefresh={() => {}}
          data={posts}
          onEndReached={loadMore}
          onEndReachedThreshold={0.8}
          ListFooterComponent={loading && <ActivityIndicator />}
          keyExtractor={(item, i) => item.id + 1}
          renderItem={({ item }) => {
            const img = findImage(item, website?.url);
            return (
              <Card
                style={styles.item}
                onPress={() =>
                  navigation.navigate("Post", { website, ...item })
                }
              >
                {img && <Card.Cover source={{ uri: img }} />}

                <Card.Content>
                  <View style={styles.title}>
                    <Text
                      variant="titleLarge"
                      style={!img ? { fontSize: 24 } : {}}
                    >
                      {cleanHtmlTags(item.title?.rendered)}
                    </Text>
                  </View>
                  <View style={styles.title}></View>
                  {!img && (
                    <Text variant="bodyMedium" numberOfLines={5}>
                      {cleanHtmlTags(item.excerpt?.rendered)}
                    </Text>
                  )}
                </Card.Content>
              </Card>
            );
          }}
        />
      </>
    );
  } else {
    return <Text>404</Text>;
  }
};

export default SearchScreen;
