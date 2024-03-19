import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { WebsiteProvider } from "./providers/WebsiteProvider";
import ChannelScreen from "./screens/Channel";
import PostScreen from "./screens/Post";
import { VideoPlayerProvider } from "./providers/VideoPlayerProvider";
import { PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <WebsiteProvider>
        <VideoPlayerProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
              <Stack.Screen name="PostScreen" component={PostScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </VideoPlayerProvider>
      </WebsiteProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
