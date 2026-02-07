import type { DeviceId } from "react-native-ble-plx";
import * as React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { router } from "expo-router";

import { ChevronLeft } from "~/assets/icons";
import StyledText from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import Button from "~/components/ui/Button";
import Card from "~/components/ui/Card";
import IconButton from "~/components/ui/IconButton";
import useBLE from "~/context/useBLE";

const Onboarding = () => {
  const { BLEDevice, connect, remove, foundDevices, search, isConnecting } = useBLE();

  async function connectDev(id: DeviceId) {
    const device = await connect(id);
  }

  return (
    <SafeAreaView>
      <TitleBar
        iconLeft={<IconButton onPress={() => router.back()} shape={"circle"} size={"small"} icon={ChevronLeft} />}
      />

      <View className="h-full w-full pt-8" style={{ paddingTop: 20 }}>
        {BLEDevice && (
          <View>
            <StyledText className={"text-light-20"}>Connected to device: {BLEDevice.name}</StyledText>
            <Button className={"bg-red"} onPress={() => remove()}>
              Remove
            </Button>
          </View>
        )}

        <StyledText className={"mt-6 text-light-20"}># of devices found: {foundDevices.length}</StyledText>

        <StyledText>Pull down to search for devices</StyledText>

        <FlatList
          className={"min-h-10 border-gray-200"}
          data={foundDevices}
          renderItem={({ item, index }) => (
            <Card key={index}>
              <StyledText>
                Hello! I am device {item.id} - {item.name}
              </StyledText>
              <Button onPress={() => connectDev(item.id)}>Connect</Button>
            </Card>
          )}
          onRefresh={() => {
            void search();
          }}
          refreshing={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
