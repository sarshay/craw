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
  useWindowDimensions,
} from "react-native";
import { API_ROUTES } from "../routes";
import { useApi } from "../hooks/api";
import { StatusBar } from "expo-status-bar";
import WebsiteContext from "../providers/WebsiteProvider";
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
// import Video from "react-native-video";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

const PostScreen = ({ route, navigation }) => {
  // const { websites } = useContext(WebsiteContext);
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
    const renderNode = (node, index, siblings, parent, defaultRenderer) => {
      if (node.name === "video") {
        const sourceNode = node.children.find(
          (child) => child.name === "source"
        );
        const img = findImage(post, website?.url);
        if (sourceNode && sourceNode.attribs && sourceNode.attribs.src) {
          const src = sourceNode.attribs.src;
          setPlayVideo({
            src: src,
            posterSource: img,
            title: post?.title?.rendered,
          });
          return <Image key={index} source={{ uri: img }} style={styles.image} />;
        }
      }
      return undefined; // Return undefined for other nodes to use the default rendering
    };
    return (
      <ScrollView style={styles.container}>
        <Text>{post?.title?.rendered}</Text>
        {post && (
          <HTMLView
            value={post?.content?.rendered}
            stylesheet={styles}
            renderNode={renderNode}
          />
          // <TRenderEngineProvider>
          //   <RenderHTMLConfigProvider>
          //     <RenderHTML
          //       contentWidth={width}
          //       customHTMLElementModels={customHTMLElementModels}
          //       source={{ html: post?.content?.rendered }}
          //     />
          //   </RenderHTMLConfigProvider>
          // </TRenderEngineProvider>
        )}
      </ScrollView>
    );
  } else {
    return <Text>404</Text>;
  }
};

export default PostScreen;
