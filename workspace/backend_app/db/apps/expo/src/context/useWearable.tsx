import { Buffer } from "buffer";
import type { ReactNode } from "react";
import type { Characteristic, Subscription } from "react-native-ble-plx";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import * as SecureStore from "expo-secure-store";

import { colors } from "@corecount/tailwind-config/constants";

import StyledText from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import Card from "~/components/ui/Card";
import { BLEService } from "~/services/BLEService";
import { Queue } from "~/utils/Queue";
import useBLE from "./useBLE";

const WearableContext = createContext<WearableContextProps>(
  {} as WearableContextProps,
);

interface WearableContextProps {
  notify: () => void;
  stopNotify: () => void;
  SensorEvents: EventEmitter;
}

export const ServiceUUID = "12345678-1234-5678-1234-56789abcdef0";
export const MMGUUID = "12345678-1234-5678-1234-56789abcdef1";
export const IMUUUID = "12345678-1234-5678-1234-56789abcdef2";

function ConnectToDevice() {
  const {
    search,
    foundDevices,
    isSearching,
    stopSearch,
    connect,
    cancel,
    isConnecting,
  } = useBLE();

  return (
    <View>
      <StyledText>Connect to device</StyledText>
      {isConnecting ? (
        <>
          <StyledText>Connecting...</StyledText>
          <ActivityIndicator color={colors.green} size={"large"} />
          <Button onPress={() => cancel()}>Cancel</Button>
        </>
      ) : (
        <>
          {isSearching ? (
            <Button onPress={() => stopSearch()}>Stop searching</Button>
          ) : (
            <Button onPress={() => search()}>Search for devices</Button>
          )}
          {isSearching && (
            <ActivityIndicator color={colors.green} size={"large"} />
          )}
        </>
      )}

      <FlatList
        className={"h-full w-full bg-gray-100"}
        data={foundDevices}
        ItemSeparatorComponent={() => <View className={"h-4"} />}
        renderItem={({ item, index }) => (
          <Card key={index}>
            <StyledText>
              Hello! I am device {item.id} - {item.name}
            </StyledText>
            <Button onPress={() => connect(item.id)}>Connect</Button>
          </Card>
        )}
      >
        <StyledText>Devices</StyledText>
      </FlatList>
    </View>
  );
}

export function WearableProvider({ children }: { children: ReactNode }) {
  const SensorEvents = new EventEmitter();

  const [initialized, setInitialized] = useState(false);
  const { BLEDevice, search, connect } = useBLE();

  const IMUSubscription = useRef<Subscription>();
  const MMGSubscription = useRef<Subscription>();

  const IMUData = useRef(new Queue<number[]>([[0, 0, 0, 0, 0]], 10));
  const MMGData = useRef(new Queue<number[]>([[0, 0, 0, 0, 0]], 50));

  const pushTimer = useRef(0);

  useEffect(() => {
    return () => {
      stopNotify();
      cancelAnimationFrame(pushTimer.current);
    };
  }, []);

  useEffect(() => {
    if (BLEDevice) {
      console.log("Oh there is one!", BLEDevice.id);
      void BLEDevice.isConnected().then((connected) => {
        if (!connected) {
          connect(BLEDevice.id).catch(() => {
            console.warn("Cant connect, search for another");
            search();
          });
        } else {
          console.log("Already connected, continue");
          setInitialized(true);
        }
      });
    } else {
      const id = SecureStore.getItem("device");
      if (id) {
        connect(id).catch(() => {
          console.warn("Cant connect, search for another");
          search();
        });
      } else {
        search();
      }
    }
  }, [BLEDevice]);

  const emitNewValues = (_timestamp: number) => {
    // Get average value of MMGData

    const averageMMG = MMGData.current
      .getQueue()
      .reduce((acc, curr) => {
        for (let i = 0; i < curr.length; i++) {
          // @ts-ignore
          acc[i] = (acc[i] ?? 0) + curr[i];
        }
        return acc;
      }, new Array<number>(6).fill(0))
      .map((sum) => sum / MMGData.current.size());

    SensorEvents.emit("MMG", averageMMG);

    // Get average value of IMUData

    const averageIMU = IMUData.current
      .getQueue()
      .reduce((acc, curr) => {
        for (let i = 0; i < curr.length; i++) {
          // @ts-ignore
          acc[i] = (acc[i] ?? 0) + curr[i];
        }
        return acc;
      }, new Array<number>(6).fill(0))
      .map((sum) => sum / IMUData.current.size());

    SensorEvents.emit("IMU", averageIMU);

    requestAnimationFrame(emitNewValues);
  };

  // Listen to Wearable Events
  const notify = () => {
    startDataRead();

    pushTimer.current = requestAnimationFrame(emitNewValues);
  };

  const parseCharacteristic = (
    char: Characteristic,
    sensorCount: number,
    sampleCount: number,
  ) => {
    const readValueInBase64 = char.value ?? "";
    const val = Buffer.from(readValueInBase64, "base64").valueOf();

    const sensorDataLength = sensorCount * 2;
    // Initialize an array to accumulate sum of each sensor
    const sensorSums = Array(sensorCount).fill(0);
    for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex++) {
      for (let sensorIndex = 0; sensorIndex < sensorCount; sensorIndex++) {
        const byteOffset = sampleIndex * sensorDataLength + sensorIndex * 2;
        const sensorValue = new DataView(
          val.buffer,
          val.byteOffset + byteOffset,
          2,
        ).getInt16(0, true);
        sensorSums[sensorIndex] += sensorValue;
      }
    }
    // Calculate the average for each sensor
    return sensorSums.map((sum) => sum / sampleCount);
  };

  const stopNotify = () => {
    BLEService.finishMonitor();
    MMGSubscription.current?.remove();
    IMUSubscription.current?.remove();
  };

  function startDataRead(): void {
    const device = BLEService.device;
    if (device) {
      void BLEService.discoverAllServicesAndCharacteristicsForDevice().then(
        () => {
          // Stop previous notify subscriptions;
          stopNotify();

          MMGSubscription.current = BLEService.setupCustomMonitor(
            device.id,
            ServiceUUID,
            MMGUUID,
            (err, char) => {
              if (!err && char) {
                const newMMG = parseCharacteristic(char, 6, 16);
                MMGData.current.enqueue(newMMG);
                //SensorEvents.emit("MMG", newMMG);
              }
            },
          );

          IMUSubscription.current = BLEService.setupCustomMonitor(
            device.id,
            ServiceUUID,
            IMUUUID,
            (err, char) => {
              if (!err && char) {
                const newIMU = parseCharacteristic(char, 6, 10);
                IMUData.current.enqueue(newIMU);
                //SensorEvents.emit("IMU", newIMU);
              }
            },
          );
        },
      );
    } else {
      console.warn("No device configured");
    }
  }

  const memo = useMemo(
    () => ({ notify, SensorEvents, stopNotify }),
    [SensorEvents],
  );

  return (
    <WearableContext.Provider value={memo}>
      {initialized ? children : <ConnectToDevice />}
    </WearableContext.Provider>
  );
}

export default function useWearable() {
  return useContext(WearableContext);
}
