import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "corecount",
  slug: "corecount",
  scheme: "corecount",
  version: "0.1.4",
  runtimeVersion: "0.1.4",
  orientation: "portrait",
  icon: "./assets/logo.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/logo.png",
    resizeMode: "contain",
    backgroundColor: "#152533",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "corecount.thebarngames.nl",
    supportsTablet: false,
  },
  android: {
    package: "corecount.thebarngames.nl",
    versionCode: 9,
    adaptiveIcon: {
      foregroundImage: "./assets/logo.png",
      backgroundColor: "#152533",
    },
  },
  extra: {
    eas: {
      projectId: "94c8bae5-4adc-488c-9378-fa9742c4c515",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "react-native-ble-plx",
    [
      "react-native-video",
      {
        // ...
        enableNotificationControls: true,
        androidExtensions: {
          useExoplayerRtsp: false,
          useExoplayerSmoothStreaming: false,
          useExoplayerHls: false,
          useExoplayerDash: false,
        },
        // ...
      },
    ],
    [
      "@sentry/react-native/expo",
      {
        url: "https://sentry.io/",
        project: "corecount",
        organization: "the-barn-games",
      },
    ],
  ],
});
