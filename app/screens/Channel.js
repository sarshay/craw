import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GeneralContext from "../providers/GeneralProviter";
import wpScan, { findImage } from "../utils/wpScan";
import { cleanHtmlTags } from "../utils/function";
import { ago } from "../utils/time";
import Card from "../UI/Card";
import IconButton from "../UI/IconButton";
import { useColor } from "../UI/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    margin: 6,
  },
  item: {
    flex: 0.5,
    margin: 6,
  },
});

const ChannelScreen = ({ route, navigation }) => {
  const { websites } = useContext(GeneralContext);
  const { id } = route.params;
  const website = websites.find((a) => a.id == id);
  useEffect(() => {
    // Define the title after component rendering
    navigation.setOptions({
      title: website?.name,
      headerRight: () => (
        <IconButton
          onPress={() => navigation.navigate("Search", { website })}
          size={26}
          name={"search"}
        />
      ),
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.goBack()}
          size={26}
          name={"arrow-back"}
        />
      ),
    });
  }, [navigation]);

  const { bgColor, primaryColor } = useColor();
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
              // console.log(data);
              setCategory(data);
            })
            .catch((error) => {
              // messageAPi.error(error?.message);
              // setWpError(error?.message)
              console.log(error);
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
          // console.error({ error });
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
      <>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ backgroundColor: bgColor()[0] }}
          >
            {category?.map((c) => (
              <Pressable
                key={c.id}
                onPress={() => setcategory_id(c.id)}
                style={{
                  padding: 8,
                  ...(category_id == c.id
                    ? { backgroundColor: primaryColor(0.2)[0] }
                    : {}),
                }}
              >
                <Text>{c.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          horizontal={false}
          style={styles.container}
          //   refreshing={loading}
          //   onRefresh={() => {}}
          data={posts}
          onEndReached={loadMore}
          onEndReachedThreshold={0.8}
          ListFooterComponent={posts && hasMore && <ActivityIndicator />}
          keyExtractor={(item) => item.id}
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
                {/* <Card.Title
                title={item.title?.rendered}
                subtitle={item.excerpt?.rendered}
                // left={LeftContent}
              /> */}
                <Card.Content>
                  {/* <HTMLView
                  value={item.title?.rendered}
                  stylesheet={!img ? { fontSize: 24 } : {}}
                  // renderNode={renderNode}
                  addLineBreaks={true}
                  lineBreak={"\n"}
                /> */}
                  <Text>{ago(item.date)}</Text>
                  <Text
                    variant="titleLarge"
                    style={!img ? { fontSize: 24 } : {}}
                  >
                    {cleanHtmlTags(item.title?.rendered)}
                  </Text>
                  {!img && (
                    <Text variant="bodyMedium" numberOfLines={5}>
                      {cleanHtmlTags(item.excerpt?.rendered)}
                    </Text>
                  )}
                </Card.Content>
                {/* <Card.Actions>
                  <Button>Cancel</Button>
                  <Button>Ok</Button>
                </Card.Actions> */}
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

export default ChannelScreen;
