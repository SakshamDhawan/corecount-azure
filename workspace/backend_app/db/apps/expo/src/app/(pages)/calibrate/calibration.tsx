import * as React from "react";
import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { ChevronLeft } from "~/assets/icons";
import { CalibrationSensor } from "~/components/calibration";
import CalibrateSensor from "~/components/calibration/CalibrateSensor";
import { CalibrationComplete } from "~/components/calibration/CalibrationComplete";
import TitleBar from "~/components/Title";
import IconButton from "~/components/ui/IconButton";
import { WearableProvider } from "~/context/useWearable";
import Button from "~/components/ui/Button";
import {
  ABNOMIAL_KEY,
  BACK_KEY,
  getCalibratedData,
  MIN_KEY,
} from "~/services/CalibrationService";

const Calibration = () => {
  const [sensor, setSensor] = useState<CalibrationSensor>(
    CalibrationSensor.BASELINE,
  );
  const [completed, setCompleted] = useState(false);
  function onNext() {
    switch (sensor) {
      case CalibrationSensor.BASELINE:
        setSensor(CalibrationSensor.BACK);
        break;
      case CalibrationSensor.BACK:
        setSensor(CalibrationSensor.ABDOMINAL);
        break;
      case CalibrationSensor.ABDOMINAL:
        setCompleted(true);
        break;
    }
  }

  function canSkip() {
    switch (sensor) {
      case CalibrationSensor.BASELINE:
        return getCalibratedData(MIN_KEY) !== null;
      case CalibrationSensor.BACK:
        return getCalibratedData(BACK_KEY) !== null;
      case CalibrationSensor.ABDOMINAL:
        return getCalibratedData(ABNOMIAL_KEY) !== null;
    }
  }

  return (
    <WearableProvider>
      <TitleBar
        iconLeft={
          <IconButton
            onPress={() => router.back()}
            shape={"circle"}
            size={"small"}
            icon={ChevronLeft}
          />
        }
        iconRight={
          !completed && (
            <Button className={"px-4"} onPress={onNext} disabled={!canSkip()}>
              skip
            </Button>
          )
        }
      >
        GETTING STARTED
      </TitleBar>

      <View className="h-full w-full">
        {!completed ? (
          <CalibrateSensor sensor={sensor} next={onNext} />
        ) : (
          <CalibrationComplete />
        )}
      </View>
    </WearableProvider>
  );
};

export default Calibration;
