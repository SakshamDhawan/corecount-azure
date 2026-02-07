import type { ComponentProps } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { clsx } from "clsx";

type TabLayoutProps = ComponentProps<typeof SafeAreaView> & {};
const PageLayout = ({ ...props }: TabLayoutProps) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#0D1623",
      }}
    >
      <StatusBar backgroundColor="#0D1623" barStyle={"light-content"} />
      <View className={clsx("h-screen w-full", props.className)}>
        {props.children}
      </View>
    </SafeAreaView>
  );
};

export default PageLayout;
