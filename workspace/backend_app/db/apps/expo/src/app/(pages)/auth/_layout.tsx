import * as React from "react";
import { Text, View } from "react-native";
import { router, Slot, usePathname } from "expo-router";

import { ChevronLeft } from "~/assets/icons";
import StyledText from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import IconButton from "~/components/ui/IconButton";
import GlobalLayout from "~/components/ui/GlobalLayout";
import Logo from "../../../../assets/Logo";

const AuthLayout = () => {
  const pathname = usePathname();

  return (
    <GlobalLayout>
      {pathname !== "/auth" && (
        <TitleBar
          className={"absolute z-10 top-0 left-0"}
          iconLeft={
            <IconButton
              onPress={() => router.back()}
              shape={"circle"}
              size={"small"}
              icon={ChevronLeft}
            />
          }
        >
          <StyledText className={"uppercase"}>
            {pathname.split("/")[2]}
          </StyledText>
        </TitleBar>
      )}

      <View
        className={
          "absolute left-1/2 -translate-x-1/2 translate-y-1/3 transform"
        }
      >
        <View style={{ opacity: pathname === "/auth" ? 100 : 50 }}>
          <Logo opacity={pathname === "/auth" ? 1 : 0.2} />
        </View>
        <View
          className={"flex"}
          style={{ opacity: pathname === "/auth" ? 1 : 0 }}
        >
          <StyledText
            className={"lowercase text-white"}
            style={{
              fontSize: 60,
              fontFamily: "Chillax-Semibold",
            }}
          >
            <Text>Core {"\n"}</Text>
            <Text>Count</Text>
          </StyledText>
        </View>
      </View>
      <View className={"flex grow"}>
        <Slot />
      </View>
    </GlobalLayout>
  );
};

export default AuthLayout;
