import type { ReactNode } from "react";
import type { Device } from "react-native-ble-plx";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

import { BLEService } from "~/services/BLEService";
import { CALIBRATED_KEY } from "~/services/CalibrationService";
import { cloneDeep } from "~/utils/cloneDeep";
import { ToastAndroid } from "react-native";

const BLEContext = createContext<BLEContextType>({} as BLEContextType);

interface BLEContextType {
  calibrated: boolean;
  BLEDevice: Device | undefined;
  foundDevices: DeviceExtendedByUpdateTime[];
  isConnecting: boolean;
  setCalibrated: (calibrated: boolean) => void;
  isSearching: boolean;
  search: () => void;
  cancel: () => void;
  stopSearch: () => void;
  connect: (id: string) => Promise<void>;
  disconnect: () => Promise<void>;
  remove: () => Promise<void>;
}

export type DeviceExtendedByUpdateTime = Device & { updateTimestamp: number };
const MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS = 5000;

export function BLEProvider({ children }: { children: ReactNode }) {
  const [calibrated, setCalibrated] = useState<boolean | undefined>();
  const [BLEDevice, setBLEDevice] = useState<Device>();
  const [isConnecting, setIsConnecting] = useState(false);
  const [foundDevices, setFoundDevices] = useState<
    DeviceExtendedByUpdateTime[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = () => {
    setIsConnecting(false);
    setIsSearching(true);
    setFoundDevices([]);
    void BLEService.initializeBLE().then(() =>
      BLEService.scanDevices(addFoundDevice, null, true),
    );
  };

  const stopSearch = () => {
    setIsSearching(false);
    void BLEService.manager.stopDeviceScan();
  };

  const cancel = () => {
    void BLEService.cancelDeviceConnection();
    setIsSearching(false);
    setIsConnecting(false);
  };

  const connectingTimeout = useRef<NodeJS.Timeout>();

  const connect = (deviceID: string) => {
    setIsConnecting(true);

    stopSearch();

    connectingTimeout.current = setTimeout(() => {
      ToastAndroid.show("BLE Timeout", ToastAndroid.SHORT);

      setIsConnecting(false);
      search();
    }, 10000);

    return BLEService.connectToDevice(deviceID)
      .then((device) => {
        console.log("Connected to", deviceID);
        setIsConnecting(false);
        setBLEDevice(device);
      })
      .catch(() => setBLEDevice(undefined))
      .finally(() => {
        clearTimeout(connectingTimeout.current);
        setIsConnecting(false);
      });
  };

  const disconnect = () => {
    return BLEService.disconnectDevice().then(() => setBLEDevice(undefined));
  };

  const addFoundDevice = (device: Device) =>
    setFoundDevices((prevState) => {
      if (!isFoundDeviceUpdateNecessary(prevState, device)) {
        return prevState;
      }

      if (!device.name?.startsWith("Playback")) {
        return prevState;
      }

      // deep clone
      const nextState = cloneDeep(prevState);
      const extendedDevice: DeviceExtendedByUpdateTime = {
        ...device,
        updateTimestamp: Date.now() + MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS,
      } as DeviceExtendedByUpdateTime;

      const indexToReplace = nextState.findIndex(
        (currentDevice) => currentDevice.id === device.id,
      );
      if (indexToReplace === -1) {
        return nextState.concat(extendedDevice);
      }
      nextState[indexToReplace] = extendedDevice;

      return nextState;
    });

  const isFoundDeviceUpdateNecessary = (
    currentDevices: DeviceExtendedByUpdateTime[],
    updatedDevice: Device,
  ) => {
    const currentDevice = currentDevices.find(
      ({ id }) => updatedDevice.id === id,
    );
    if (!currentDevice) {
      return true;
    }
    return currentDevice.updateTimestamp < Date.now();
  };

  const remove = () => {
    return BLEService.disconnectDevice().then(async () => {
      await SecureStore.deleteItemAsync("device");
      setBLEDevice(undefined);
    });
  };

  useEffect(() => {
    if (BLEService.device) {
      setBLEDevice(BLEService.device);
      setIsConnecting(false);
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (calibrated !== undefined) {
      SecureStore.setItem(CALIBRATED_KEY, String(calibrated));
    }
  }, [calibrated]);

  useEffect(() => {
    const cal = SecureStore.getItem(CALIBRATED_KEY);
    if (cal === "true") setCalibrated(true);
    void BLEService.initializeBLE();
  }, []);

  useEffect(() => {
    if (BLEDevice) {
      SecureStore.setItem("device", BLEDevice.id);
    }
  }, [BLEDevice]);

  const memo = useMemo(
    () => ({
      calibrated,
      BLEDevice,
      foundDevices,
      isConnecting,
      isSearching,
      setCalibrated,
      stopSearch,
      search,
      connect,
      disconnect,
      remove,
      cancel,
    }),
    [calibrated, BLEDevice, foundDevices, isConnecting, isSearching],
  );

  return <BLEContext.Provider value={memo}>{children}</BLEContext.Provider>;
}

export default function useBLE() {
  return useContext(BLEContext);
}
