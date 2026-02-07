import "@bacons/text-decoder/install";

import { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import Toast from "react-native-toast-message";
import * as Application from "expo-application";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { SplashScreen, Stack } from "expo-router";

import { TRPCProvider } from "~/context/useTRPC";

import "../styles.css";

import { BleManager } from "react-native-ble-plx";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Sentry from "@sentry/react-native";

import alert from "~/assets/icons/Alert";
import Toaster from "~/components/Toaster";
import { AuthProvider } from "~/context/useAuth";
import { BLEProvider } from "~/context/useBLE";
import { colors } from "@corecount/tailwind-config/constants";

const enabledSentry = process.env.EXPO_PUBLIC_SENTRY ?? false;
if (enabledSentry === "true") {
  Sentry.init({
    dsn: "https://3e8cac67ad79a7e8e44840330ce2e496@o4504927283249152.ingest.us.sentry.io/4507802693861376",
    enableTracing: true,
    tracesSampleRate: 1,
    environment: process.env.EXPO_PUBLIC_SENTRY_ENVIRONMENT ?? "development",
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

void SplashScreen.preventAutoHideAsync();

export const manager = new BleManager();

export default function RootLayout() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    [],
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    void registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token),
    );

    if (Platform.OS === "android") {
      void Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? []),
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [loaded, error] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-require-imports
    "Chillax-Regular": require("../../assets/fonts/Chillax-Regular.otf"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-require-imports
    "Chillax-Bold": require("../../assets/fonts/Chillax-Bold.otf"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-require-imports
    "Chillax-ExtraLight": require("../../assets/fonts/Chillax-Extralight.otf"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-require-imports
    "Chillax-Light": require("../../assets/fonts/Chillax-Light.otf"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-require-imports
    "Chillax-Medium": require("../../assets/fonts/Chillax-Medium.otf"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-require-imports
    "Chillax-Semibold": require("../../assets/fonts/Chillax-Semibold.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <TRPCProvider>
      <AuthProvider>
        <BLEProvider>
          <SafeAreaProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: colors.dark["80"],
                  paddingLeft: 8,
                  paddingRight: 8,
                },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            {/*<Toaster />*/}
          </SafeAreaProvider>
        </BLEProvider>
      </AuthProvider>
    </TRPCProvider>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here", test: { test1: "more data" } },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
