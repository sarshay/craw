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
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import wpScan, { findImage } from "../utils/wpScan";
import HTMLView from "react-native-htmlview";
import useVideoPlayer from "../providers/VideoPlayerProvider";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";
import Card from "../UI/Card";
import IconButton from "../UI/IconButton";
import * as VideoThumbnails from "expo-video-thumbnails";
import RenderHTML, {
  RenderHTMLConfigProvider,
  TRenderEngineProvider,
} from "react-native-render-html";
import { cleanHtmlTags } from "../utils/function";
import TheImageViewer from "../components/ImageViewer";
// import Video from "react-native-video";

const window = Dimensions.get("window");

const PostScreen = ({ route, navigation }) => {
  // const { websites } = useContext(GeneralContext);
  const { id, website } = route.params;
  const [images, setImages] = useState([]);
  const [openImage, setOpenImage] = useState(null);

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
    const renderNode = (node, index, siblings, parent, defaultRenderer) => {
      if (node.name === "video") {
        const sourceNode = node.children.find(
          (child) => child.name === "source"
        );
        if (sourceNode && sourceNode.attribs && sourceNode.attribs.src) {
          const src = sourceNode.attribs.src;

          return <TheVideo key={index} src={src} post={post} />;
        }
      } else if (node.name == "iframe") {
        const a = node.attribs;
        const iframeHtml = `<html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no"/>
          <style>
          body, html { margin: 0; padding: 0; }
          iframe { width: 100%; height: 100%; border: none; } /* Remove border from iframe */
        </style>
        </head>
        <body style="margin: 0; padding: 0;">
        <iframe src="${a.src}" height="100%" width="100%" frameborder="0"></iframe>
        </body>
        </html>`;
        return (
          <View
            key={index}
            style={{
              width: Number(window.width - 32),
              height: Number(window.width / 1.4),
              backgroundColor: "#777777d",
            }}
          >
            <WebView
              userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
              source={{
                html: iframeHtml,
                // uri: a.src,
              }}
            />
          </View>
        );
      } else if (node.name == "img") {
        const a = node.attribs;
        setImages((img) => [...img, { url: a.src }]);
        return (
          <Pressable key={index} onPress={() => setOpenImage(a.src)}>
            <TheImage a={a} />
          </Pressable>
        );
      } else if (node.name == "p") {
        if (node.data) {
          const data = node.data?.trim();
          return (
            <View key={index} style={{ backgroundColor: "green" }}>
              <Text>{data}</Text>
            </View>
          );
        } else {
          return (
            <View key={index}>{defaultRenderer(node.children, parent)}</View>
          );
        }
      } else if (node.name == "br") {
        return <View key={index} />;
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
        headerLeft: () => (
          <IconButton
            onPress={() => navigation.goBack()}
            size={26}
            name={"arrow-back"}
          />
        ),
      });
    }, [post]);
    const _handlePressButtonAsync = async () => {
      let result = await WebBrowser.openBrowserAsync(`${website.url}?p=${id}`);
      // setResult(result);
    };

    return (
      <React.Fragment>
        <TheImageViewer
          images={images}
          openImage={openImage}
          setOpenImage={setOpenImage}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ margin: 16 }}>
            <Text style={{ fontSize: 24, marginBottom: 32 }}>
              {post?.title?.rendered}
            </Text>
            {post && (
              <HTMLView
                value={post?.content?.rendered}
                renderNode={renderNode}
                // addLineBreaks={true}
                // lineBreak={"\n"}
              />
              // <TRenderEngineProvider>
              //   <RenderHTMLConfigProvider>
              //     <RenderHTML
              //       contentWidth={window.width}
              //       // renderersProps={renderNode}
              //       // customHTMLElementModels={customHTMLElementModels}
              //       source={{ html: post?.content?.rendered }}
              //     />
              //   </RenderHTMLConfigProvider>
              // </TRenderEngineProvider>
            )}
            {!loading && (
              <Card onPress={_handlePressButtonAsync}>
                {/* <Card.Cover source={{ uri: img }} /> */}
                <Card.Title
                  title={website.name}
                  subtitle={website.url}
                  right={(props) => <Icon size={26} name="external-link" />}
                />
              </Card>
            )}
          </View>
        </ScrollView>
      </React.Fragment>
    );
  } else {
    return <Text>404</Text>;
  }
};

export default PostScreen;

const TheImage = ({ a }) => {
  // const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const windowWidth = useWindowDimensions().width; // Get window width using useWindowDimensions hook

  // // Check if image source is valid
  // if (!a || !a.src) {
  //   return null; // Return null or some placeholder component if image source is missing
  // }
  // Image.getSize(a.src, (width, height) => {
  //   setImageSize({ width, height });
  // });
  // const aspectRatio = imageSize.width / imageSize.height;
  // const height = parseFloat((windowWidth / aspectRatio).toFixed(0));
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: a.src }}
        style={{
          flex: 1,
          margin: 0,
          marginLeft: -16,
          marginRight: -16,
          width: windowWidth,
          height: windowWidth / 1.4,
        }}
        resizeMode="contain"
      />
    </View>
  );
};
const TheVideo = ({ src, post }) => {
  const [thumbnailUri, setThumbnailUri] = useState(null);
  const { playVideo, setPlayVideo } = useVideoPlayer();

  useEffect(() => {
    (async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(src);
        setThumbnailUri(uri);
      } catch (error) {
        console.error("Error getting thumbnail:", error);
      }
    })();
  }, [src]);
  return (
    <View
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
        source={{ uri: thumbnailUri }}
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
            posterSource: thumbnailUri,
            title: cleanHtmlTags(post?.title?.rendered),
          })
        }
      >
        <Icon name="play" size={60} style={{ color: "white" }} />
      </Pressable>
    </View>
  );
};
