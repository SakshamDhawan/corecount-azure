import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { router } from "expo-router";

import { ChevronLeft, Kebab } from "~/assets/icons";
import { CalibrationChart } from "~/components/calibration/CalibrationChart";
import StyledText from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import IconButton from "~/components/ui/IconButton";
import useBLE from "~/context/useBLE";
import { WearableProvider } from "~/context/useWearable";

const Onboarding = () => {
  const { BLEDevice } = useBLE();

  return (
    <SafeAreaView>
      <TitleBar
        iconLeft={<IconButton onPress={() => router.back()} shape={"circle"} size={"small"} icon={ChevronLeft} />}
      >
        Your sensors
      </TitleBar>

      <View className="h-full w-full pt-8" style={{ paddingTop: 20 }}>
        <StyledText>Connected to device: {BLEDevice?.name}</StyledText>

        <WearableProvider>
          <View>
            <View className={"flex flex-row justify-between"}>
              <View>
                <StyledText>SENSOR 1</StyledText>
              </View>
              <View className={"flex flex-row"}>
                <StyledText>25% Intensity</StyledText>
                <Kebab fill={"#01CFCC"} height={20} width={20} />
              </View>
            </View>
          </View>
          <View className={"h-40 rounded-xl bg-dark-60"}>
            <CalibrationChart />
          </View>
        </WearableProvider>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
