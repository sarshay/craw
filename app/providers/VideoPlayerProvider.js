import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/api";
import { API_ROUTES } from "../routes";
import {
  View,
  StyleSheet,
  Button,
  Pressable,
  Text,
  Dimensions,
  BackHandler,
  TouchableHighlightComponent,
  ActivityIndicator,
  Platform,
  ScrollView,
  NativeModules,
} from "react-native";
const { StatusBarManager } = NativeModules;

import { Video, ResizeMode } from "expo-av";
import { TouchableHighlight } from "react-native-gesture-handler";
// import Icon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import IconButton from "../UI/IconButton";
// Ionicons
const VideoPlayerContext = createContext();
export const VideoPlayerProvider = ({ children }) => {
  const [playVideo, setPlayVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const video = React.useRef(null);
  const [playerStatus, setPlayerStatus] = React.useState({});
  const [playerOpen, setPlayerOpen] = React.useState(null);

  const play = async () => {
    playerStatus.isPlaying
      ? video.current.pauseAsync()
      : video.current.playAsync();
  };
  useEffect(() => {
    if (playVideo) {
      setLoading(!playerStatus.isPlaying && true);
      setPlayerOpen(true);
    }
  }, [playVideo]);

  useEffect(() => {
    if (playerOpen) {
      const backAction = () => {
        setPlayerOpen(false);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }
  }, [playerOpen]);

  const [showControl, setShowControl] = useState(false);
  const downloadFromUrl = async (src) => {
    try {
      console.log({ downloading: src });
      const path = src.split("?")[0];
      const parts = path.split(".");
      const extension = parts.pop();
      const filename = `${Date.now()}.${extension}`;
      console.log({ filename });
      const result = await FileSystem.downloadAsync(
        src,
        FileSystem.documentDirectory + filename
      );
      console.log(result);

      save(result.uri, filename, result.headers["Content-Type"]);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const save = async (uri, filename, mimetype) => {
    try {
      console.log("download start");
      if (Platform.OS === "android") {
        const permissions = await FileSystem.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const directoryUri = FileSystem.documentDirectory + "files/";
          await FileSystem.makeDirectoryAsync(directoryUri, {
            intermediates: true,
          });
          const fileUri = directoryUri + filename;
          await FileSystem.writeAsStringAsync(fileUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          console.log("File saved successfully:", fileUri);
        } else {
          console.log("Directory permissions not granted");
        }
      } else {
        console.log("Platform not supported");
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };
  return (
    <VideoPlayerContext.Provider
      value={{
        playVideo,
        setPlayVideo,
        videoList,
        setVideoList,
        setPlayerStatus,
      }}
    >
      {children}
      {playVideo && (
        <View style={playerOpen ? styles.container : styles.containerSmall}>
          <Pressable
            onPress={() => {
              playerOpen ? setShowControl(!showControl) : setPlayerOpen(true);
            }}
          >
            <Video
              ref={video}
              style={
                playerOpen ? styles.videoContainer : styles.videoContainerSmall
              }
              source={{
                uri: playVideo.src,
              }}
              useNativeControls={playerOpen ? showControl : false}
              resizeMode={ResizeMode.CONTAIN}
              onReadyForDisplay={() => {
                play();
                setLoading(false);
              }}
              showPoster={true}
              usePoster={true}
              posterSource={{ uri: playVideo?.posterSource }}
              videoStyle={playerOpen ? styles.video : styles.videoSmall}
              isLooping
              onPlaybackStatusUpdate={(status) => setPlayerStatus(() => status)}
            />
          </Pressable>
          {playerOpen ? (
            <ScrollView>
              <StatusBar style="light" />
              <Text>{playVideo?.title}</Text>
              {/* <IconButton
                name={"content-save"}
                size={24}
                onPress={() => downloadFromUrl(playVideo.src)}
              /> */}
            </ScrollView>
          ) : (
            <View style={styles.flex}>
              <Pressable
                onPress={() => setPlayerOpen(true)}
                style={[styles.child, styles.fullWidthItem]}
              >
                <Text numberOfLines={1}>{playVideo?.title}</Text>
              </Pressable>
              <View style={styles.child}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <IconButton
                    name={playerStatus.isPlaying ? "pause" : "play"}
                    size={24}
                    onPress={play}
                  />
                )}
              </View>
              <View style={styles.child}>
                <IconButton
                  name={"close"}
                  size={24}
                  onPress={() => setPlayVideo(false)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </VideoPlayerContext.Provider>
  );
};

export default useVideoPlayer = () => useContext(VideoPlayerContext);

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%", //height,
    width: "100%",
    paddingTop: StatusBarManager.HEIGHT,
    backgroundColor: "#333333",
  },
  videoContainer: {
    width: "100%",
    height: 220,
  },

  containerSmall: {
    position: "fixed",
    height: 72,
    width: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoContainerSmall: {
    width: 140,
    height: "100%",
  },

  video: {
    width: "100%",
    height: "100%",
  },
  videoSmall: {
    height: "100%",
    width: "100%",
  },
  flex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  child: {
    justifyContent: "center",
  },
  fullWidthItem: {
    flex: 1,
    padding: 16,
    width: "auto", // Reset the width to fill the remaining space
  },
});
