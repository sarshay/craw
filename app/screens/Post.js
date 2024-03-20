import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { API_ROUTES } from "../routes";
import { useApi } from "../hooks/api";
import { StatusBar } from "expo-status-bar";
import GeneralContext from "../providers/GeneralProviter";
import Icon from "react-native-vector-icons/Ionicons";
import wpScan, { findImage } from "../utils/wpScan";
import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
  RenderHTMLConfigProvider,
  RenderHTMLSource,
  TRenderEngineProvider,
  defaultHTMLElementModels,
} from "react-native-render-html";
import HTMLView from "react-native-htmlview";
import useVideoPlayer from "../providers/VideoPlayerProvider";
import { Avatar, Card, IconButton } from "react-native-paper";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";
// import Video from "react-native-video";

const window = Dimensions.get("window");

const PostScreen = ({ route, navigation }) => {
  // const { websites } = useContext(GeneralContext);
  const { id, website } = route.params;
  // const website = websites.find((a) => a.id == id);

  if (website) {
    const [loading, setLoadig] = useState(false);
    const [message, setMessage] = useState(false);
    const [post, setPost] = useState(null);

    const wp = wpScan({
      wpUrl: website?.url,
      api_base_path: website?.api_base_path,
    });

    useEffect(() => {
      if (website) {
        const fetchData = () => {
          setLoadig(true);
          wp.getPostDetail(id)
            .then((data) => {
              setPost(data);
            })
            .catch((error) => {
              // messageAPi.error(error?.message);
              // setWpError(error?.message)
            })
            .finally(() => {
              setLoadig(false);
            });
        };
        fetchData();
      }
    }, [website]);
    const { playVideo, setPlayVideo } = useVideoPlayer();
    const img = findImage(post, website?.url);
    const renderNode = (node, index, siblings, parent, defaultRenderer) => {
      if (node.name === "video") {
        const sourceNode = node.children.find(
          (child) => child.name === "source"
        );
        if (sourceNode && sourceNode.attribs && sourceNode.attribs.src) {
          const src = sourceNode.attribs.src;

          return (
            <View
              key={index}
              style={{
                backgroundColor: "#888888",
                height: window.width / 1.6,
                width: window.width - 32,
                flex: 1,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: img }}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />

              <Pressable
                style={{
                  // height: window.width / 2,
                  // width: window.width - 16,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#22222288",
                }}
                onPress={() =>
                  setPlayVideo({
                    src: src,
                    posterSource: img,
                    title: post?.title?.rendered,
                  })
                }
              >
                <Icon name="play" size={60} style={{ color: "red" }} />
              </Pressable>
            </View>
          );
        }
      } else if (node.name == "iframe") {
        const a = node.attribs;
        const iframeHtml = `<iframe src="${a.src}" height="100%" width="100%"></iframe>`;
        return (
          <View
            key={index}
            style={{
              width: Number(window.width),
              height: Number(window.width / 1.4),
              backgroundColor: "#777777d",
            }}
          >
            <WebView
              source={{
                html: iframeHtml,
                // uri: a.src,
              }}
            />
          </View>
        );
      } else if (node.name == "img") {
        const a = node.attribs;
        // console.log(a.src);
        return (
          <View key={index}>
            <Image
              source={{ uri: a.src }}
              style={{
                height: window.width / 1.4,
                width: window.width - 32,
              }}
            />
          </View>
        );
      } else if (node.name == "p") {
        return (
          <View key={index} style={{ margin: 0 }}>
            {defaultRenderer(node.children, parent)}
          </View>
        );
      } else {
        return;
      } // Return undefined for other nodes to use the default rendering
    };
    useEffect(() => {
      var title = "loading..";
      if (post) {
        title = post?.title.rendered;
      }
      navigation.setOptions({
        title,
      });
    }, [post]);
    const _handlePressButtonAsync = async () => {
      let result = await WebBrowser.openBrowserAsync(`${website.url}?p=${id}`);
      // setResult(result);
    };
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, marginBottom: 32 }}>
            {post?.title?.rendered}
          </Text>
          {post && (
            <HTMLView
              value={post?.content?.rendered}
              stylesheet={{ margin: 16 }}
              renderNode={renderNode}
              // addLineBreaks={true}
              // lineBreak={"\n"}
            />
            // <TRenderEngineProvider>
            //   <RenderHTMLConfigProvider>
            //     <RenderHTML
            //       contentWidth={window.width}
            //       // customHTMLElementModels={customHTMLElementModels}
            //       source={{ html: post?.content?.rendered }}
            //     />
            //   </RenderHTMLConfigProvider>
            // </TRenderEngineProvider>
          )}
          <Card onPress={_handlePressButtonAsync}>
            <Card.Cover source={{ uri: img }} />
            <Card.Title
              title={website.name}
              subtitle={website.url}
              right={(props) => <IconButton icon="web" />}
            />
          </Card>
        </View>
      </ScrollView>
    );
  } else {
    return <Text>404</Text>;
  }
};

export default PostScreen;
