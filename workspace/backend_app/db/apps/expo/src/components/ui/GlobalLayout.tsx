import type { ComponentProps } from "react";
import type { View } from "react-native";
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native";
type TabLayoutProps = ComponentProps<typeof View> & {};
const GlobalLayout = ({ ...props }: TabLayoutProps) => {
  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: "#0D1623",
        paddingTop: StatusBar.currentHeight,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default GlobalLayout;
