import { useColorScheme } from "react-native";
export const useColor = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme == "dark";
  const hue = 200;
  if (isDark) {
    return {
      primaryColor: (opacity = 1) => [`hsla(${hue}, 40%, 50%, ${opacity})`],
      lightColor: (opacity = 1) => [`hsla(${hue}, 0%, 100%, ${opacity})`],
      darkColor: (opacity = 1) => [`hsla(${hue}, 0%,  0%, ${opacity})`],
      bgColor: (opacity = 1) => [`hsla(${hue}, 40%, 100%, ${opacity})`],
      textColor: (opacity = 1) => [`hsla(${hue}, 20%, 10%, ${opacity})`],
    };
  } else {
    return {
      primaryColor: (opacity = 1) => [`hsla(${hue}, 30%, 50%, ${opacity})`],
      lightColor: (opacity = 1) => [`hsla(${hue}, 0%, 100%, ${opacity})`],
      darkColor: (opacity = 1) => [`hsla(${hue}, 0%,  0%, ${opacity})`],
      bgColor: (opacity = 1) => [`hsla(${hue}, 40%, 100%, ${opacity})`],
      textColor: (opacity = 1) => [`hsla(${hue}, 20%, 10%, ${opacity})`],
    };
  }
};
