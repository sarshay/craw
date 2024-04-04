import * as Linking from "expo-linking";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/Home";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { GeneralProviter } from "./providers/GeneralProviter";
import ChannelScreen from "./screens/Channel";
import PostScreen from "./screens/Post";
import { VideoPlayerProvider } from "./providers/VideoPlayerProvider";
import SearchScreen from "./screens/Search";
import { useEffect } from "react";
import SettingScreen from "./screens/Setting";
import IconButton from "./UI/IconButton";

const Stack = createStackNavigator();
export default function App() {
  const linking = {
    prefixes: [
      "crow://",
      "https://himyanmar.online",
      "https://*.himyanmar.online",
    ],
    config: {
      screens: {
        Home: "home",
        Channel: "channel/:id",
      },
    },
  };
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <APPP />
    </NavigationContainer>
  );
}
const APPP = () => {
  const navigation = useNavigation();
  const config = {
    animation: "timing",
    config: {
      duration: 200,
    },
  };
  useEffect(() => {
    const handleDeepLink = async (event) => {
      const { url } = event;
      if (url) {
        const { path, queryParams } = Linking.parse(url);
        console.log(
          `Linked to app with path: ${path} and data: ${JSON.stringify(
            queryParams
          )}`
        );

        // Navigate to the appropriate screen based on the URL data
        if (path === "/channel/:id") {
          const { id } = queryParams;
          if (id) {
            navigation.navigate("Channel", { id });
          }
        }
      }
    };

    // Add event listener to handle incoming deep links
    Linking.addEventListener("url", handleDeepLink);

    // Return a cleanup function to remove the event listener
    return;
  }, []);

  return (
    <GeneralProviter>
      <VideoPlayerProvider>
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
          <Stack.Screen name="Channel" component={ChannelScreen} />
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
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            // options={{ headerShown: false }}
          />
        </Stack.Navigator>

        <IconButton
          name={"settings-outline"}
          style={{ position: "absolute", bottom: 0, right: 0 }}
          onPress={() => navigation.navigate("Setting")}
        />
      </VideoPlayerProvider>
    </GeneralProviter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
