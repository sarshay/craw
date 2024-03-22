import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/Home";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { GeneralProviter } from "./providers/GeneralProviter";
import ChannelScreen from "./screens/Channel";
import PostScreen from "./screens/Post";
import { VideoPlayerProvider } from "./providers/VideoPlayerProvider";
import SearchScreen from "./screens/Search";

const Stack = createStackNavigator();
export default function App() {
  const config = {
    animation: "timing",
    config: {
      duration: 200,
    },
  };
  return (
    <GeneralProviter>
      <VideoPlayerProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              // animation: "slide_from_left",
              gestureResponseDistance: 150,

              transitionSpec: {
                open: config,
                close: config,
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
              // options={{
              //   hideWhenScrolling: true,
              // }}
            />
            <Stack.Screen
              name="Channel"
              component={ChannelScreen}
            />
            <Stack.Screen
              name="Post"
              options={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                presentation: "modal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
              component={PostScreen}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </VideoPlayerProvider>
    </GeneralProviter>
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
