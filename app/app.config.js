const myValue = "Crow";

module.exports = {
  name: myValue,
  slug: "crow",
  orientation: "portrait",
  icon: process.env.EXPO_PUBLIC_API_URL || "./assets/icon.png",
  userInterfaceStyle: "light",
  version: process.env.MY_CUSTOM_PROJECT_VERSION || "1.0.0",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  expo: {
    extra: {
      eas: {
        projectId: "d0d19f2d-6890-426e-8fac-b9615a4c76ac",
      },
    },
    android: {
      usesCleartextTraffic: true,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.heinsoe.crow",
      versionCode: 1,
    },
  },
};
