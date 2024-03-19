import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { API_ROUTES } from "../routes";
import { useApi } from "../hooks/api";
import { StatusBar } from "expo-status-bar";
import WebsiteContext from "../providers/WebsiteProvider";
import wpScan from "../utils/wpScan";

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

const ChannelScreen = ({ route, navigation }) => {
  const { websites } = useContext(WebsiteContext);
  const { id } = route.params;
  const website = websites.find((a) => a.id == id);

  if (website) {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoadig] = useState(false);
    const [message, setMessage] = useState(false);

    const [category, setCategory] = useState([]);
    const [category_id, setcategory_id] = useState(null);
    const cuttentCat = category?.find((cat) => cat.id == category_id);
    const [posts, setPosts] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    const postCount = cuttentCat
      ? cuttentCat.count
      : category.reduce((acc, c) => acc + c.count, 0);
    // let _category = query.get("categories") ? `&categories=${query.get("categories")}` : ``;
    const wp = wpScan({
      wpUrl: website?.url,
      api_base_path: website?.api_base_path,
    });

    useEffect(() => {
      setCategory([]);
      if (website) {
        const fetchData = () => {
          setCategoryLoading(true);
          wp.getCategory()
            .then((data) => {
              setCategory(data);
            })
            .catch((error) => {
              // messageAPi.error(error?.message);
              // setWpError(error?.message)
            })
            .finally(() => {
              setCategoryLoading(false);
            });
        };
        fetchData();
      }
    }, [website]);
    const loadMore = () => {
      if (!hasMore && loading) return;
      setLoadig(true);
      console.log("Page load" + page);
      wp.getPost({
        categories: category_id,
        page: page,
        ...(searchWord && { search: searchWord }),
      })
        .then((data) => {
          setPosts((old) => [...old, ...data]);
          setMessage(postCount - posts?.length);
          setPage((pre) => pre + 1);
        })
        .catch((error) => {
          setHasMore(false);
          console.error({ error });
          //   messageAPi.error(error?.message);
          // setWpError(error?.message)
        })
        .finally(() => {
          setLoadig(false);
        });
    };
    useEffect(() => {
      setHasMore(true);
      setPosts([]);
      setPage(1);
    }, [website, category_id, searchWord]);

    return (
      <View style={styles.container}>
        <Text>{website.name}</Text>
        <Text>{id}</Text>
        <Text>{page}</Text>
        <Text>{hasMore ? "hasMore" : ""}</Text>
        <FlatList
          //   refreshing={loading}
          //   onRefresh={() => {}}
          data={posts}
          onEndReached={loadMore}
          onEndReachedThreshold={0.8}
          ListFooterComponent={posts && <ActivityIndicator />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("PostScreen", { website, ...item })
              }
            >
              <Text>{item.title?.rendered}</Text>
              <Text>{item.date}</Text>
              <Text>{item.title?.rendered}</Text>
              <Text>{item.title?.rendered}</Text>
              <Text>{item.title?.rendered}</Text>
              <Text>{item.title?.rendered}</Text>
              <Text>{item.title?.rendered}</Text>
              <Text>{item.title?.rendered}</Text>
            </Pressable>
          )}
        />
        {/* <Button onPress={loadMore} title="load more" /> */}
      </View>
    );
  } else {
    return <Text>404</Text>;
  }
};

export default ChannelScreen;
