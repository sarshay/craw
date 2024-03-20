import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { GeneralProviter } from "./providers/GeneralProviter";
import ChannelScreen from "./screens/Channel";
import PostScreen from "./screens/Post";
import { VideoPlayerProvider } from "./providers/VideoPlayerProvider";
import { IconButton, PaperProvider } from "react-native-paper";
import SearchScreen from "./screens/Search";

const Stack = createStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <GeneralProviter>
        <VideoPlayerProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                animation: "slide_from_right",
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Channel" component={ChannelScreen} />
              <Stack.Screen name="Post" component={PostScreen} />
              <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </VideoPlayerProvider>
      </GeneralProviter>
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
