import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Device } from "react-native-ble-plx";
// import { Peripheral } from "react-native-ble-manager";
import ReactNativeBlobUtil from "react-native-blob-util";
import RNFS from "react-native-fs";
import { DFUEmitter, NordicDFU } from "react-native-nordic-dfu";
import RNFetchBlob from "rn-fetch-blob";

import { BLEService } from "~/services/BLEService";

// import { BleManagerService } from "./src/BleService";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    backgroundColor: "#F98234",
  },
  deviceContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 100,
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 200,
  },
  text: {
    color: "black",
  },
});

const FB = RNFetchBlob.config({
  fileCache: true,
  appendExt: "zip",
});

const DeviceInfo: React.FC = () => {
  const [device, setDevice] = useState<Device>(BLEService.device);
  const [percentage, setPercentage] = useState(0);
  const filePath = "http://192.168.1.12:3003/uploads/firmwareDFU.zip";

  const uploadToDevice = async (filePath: string) => {
    console.log("Start firmware flash");

    if (!BLEService.device) {
      return console.log("No Device");
    }

    let destination = `${RNFS.DocumentDirectoryPath}/installationFile.zip`;

    console.log(destination);

    const exists = await RNFS.exists(destination);
    exists && (await RNFS.unlink(destination));
    console.log("Besta jij?", exists);
    const exists2 = await RNFS.exists(destination);
    exists2 && (await RNFS.unlink(destination));
    console.log("Besta jij?", exists2);

    const response = await FB.fetch("GET", filePath);
    console.log("File saved", response.path());
    destination = response.path();

    console.log("destination", destination);

    console.log("Set listener");
    DFUEmitter.addListener("DFUProgress", ({ percent }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      percent && setPercentage(percent);
    });

    console.log("Start flash");
    return NordicDFU.startDFU({
      deviceAddress: device.id,
      deviceName: device.name,
      filePath: Platform.OS === "ios" ? `file://${destination}` : destination,
    })
      .then(() => {
        console.log("Done");
      })
      .catch((err) => {
        console.log("DFU", err);
        DFUEmitter.removeAllListeners("DFUProgress");
        return Promise.reject(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{"New Example Nordic DFU"}</Text>
      <View style={styles.deviceContainer}>
        <Text style={styles.text}>{device?.name}</Text>
        <Text style={styles.text}>{device?.id}</Text>
        <Text style={styles.text}>{percentage}</Text>
      </View>
      {/*<TouchableOpacity style={styles.buttonContainer} onPress={onPressConnectDevice}>*/}
      {/*  <Text>{"Connect to Device in Area"}</Text>*/}
      {/*</TouchableOpacity>*/}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          uploadToDevice(filePath);
        }}
      >
        <Text>{"Start Update"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeviceInfo;
