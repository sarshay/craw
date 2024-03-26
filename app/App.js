import * as Linking from "expo-linking";
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
  // Linking.openURL('https://expo.dev');
  const url = Linking.useURL();

  const { hostname, path, queryParams } = Linking.parse(url);
  console.log(
    `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
      queryParams
    )}`
  );
  const linking = {
    prefixes: ["crow://", "https://himyanmar.online", "https://*.himyanmar.online"],
    filter: (url) => !url.includes('+expo-auth-session'),
    config: {
      screens: {
        Home: {
          path: "home",
        },
        Channel: {
          path: "channel/:id",
          parse: {
            id: (id) => `${id}`,
          },
        },
        // Post: {
        //   path: "post/:id",
        //   parse: {
        //     id: (id) => `${id}`,
        //   },
        // },
      },
    },
  };
  return (
    <GeneralProviter>
      <VideoPlayerProvider>
        <NavigationContainer
          linking={linking}
          fallback={<Text>Loading...</Text>}
        >
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
