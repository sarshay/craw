import { useColorScheme } from "react-native";
export const useColor = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  // console.log({isDark,colorScheme})
  const hue = 200;
  if (!isDark) {
    return {
      primaryColor: (opacity = 1) => [`hsla(${hue}, 80%, 50%, ${opacity})`],
      warnningColor: (opacity = 1) => [`hsla(20, 80%, 50%, ${opacity})`],
      dangerColor: (opacity = 1) => [`hsla(0, 80%, 50%, ${opacity})`],
      lightColor: (opacity = 1) => [`hsla(${hue}, 0%, 100%, ${opacity})`],
      darkColor: (opacity = 1) => [`hsla(${hue}, 0%,  0%, ${opacity})`],
      bgColor: (opacity = 1) => [`hsla(${hue}, 40%, 100%, ${opacity})`],
      textColor: (opacity = 1) => [`hsla(${hue}, 20%, 10%, ${opacity})`],
    };
  } else {
    return {
      primaryColor: (opacity = 1) => [`hsla(${hue}, 30%, 35%, ${opacity})`],
      warnningColor: (opacity = 1) => [`hsla(20, 40%, 35%, ${opacity})`],
      dangerColor: (opacity = 1) => [`hsla(0, 40%, 35%, ${opacity})`],
      lightColor: (opacity = 1) => [`hsla(${hue}, 0%, 85%, ${opacity})`],
      darkColor: (opacity = 1) => [`hsla(${hue}, 0%,  0%, ${opacity})`],
      bgColor: (opacity = 1) => [`hsla(${hue}, 40%, 100%, ${opacity})`],
      textColor: (opacity = 1) => [`hsla(${hue}, 20%, 10%, ${opacity})`],
    };
  }
};
