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

const SettingScreen = ({ route, navigation }) => {
  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        
      </ScrollView>
    </React.Fragment>
  );
};

export default SettingScreen;
