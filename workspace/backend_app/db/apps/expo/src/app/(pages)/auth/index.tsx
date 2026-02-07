import * as React from "react";
import { View } from "react-native";
import { router } from "expo-router";

import Button from "~/components/ui/Button";

export default function Index() {
  return (
    <>
      <View className={"m-auto flex grow flex-col"} />
      <View className={"flex justify-end gap-2"}>
        <Button onPress={() => router.push("/auth/login")}>LOGIN</Button>
        <Button onPress={() => router.push("/auth/register")}>REGISTER</Button>
      </View>
    </>
  );
}
