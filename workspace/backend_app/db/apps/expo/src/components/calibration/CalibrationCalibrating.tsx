import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

import type { CalibrationChartRef } from "~/components/calibration/CalibrationChart";
import type { CalibrateSensorProps } from "~/components/calibration/index";
import { CalibrationChart } from "~/components/calibration/CalibrationChart";
import { CalibrationSensor } from "~/components/calibration/index";
import StyledText, { typography } from "~/components/styled/StyledText";
import TimerBar from "~/components/TimerBar";
import Button from "~/components/ui/Button";
import useWearable from "~/context/useWearable";
import {
  ABNOMIAL_KEY,
  BACK_KEY,
  MIN_KEY,
  setCalibratedData,
} from "~/services/CalibrationService";

const CalibrationCalibrating = ({ sensor, ...props }: CalibrateSensorProps) => {
  const [calibrating, setCalibrating] = useState(true);

  const { notify, stopNotify } = useWearable();

  const calibrationRef = useRef<CalibrationChartRef>();

  useEffect(() => {
    notify();

    return () => {
      stopNotify();
    };
  }, []);

  const ProgressText = () => {
    const text = () => {
      switch (sensor) {
        case CalibrationSensor.BASELINE:
          return "Hold still. \nMeasuring your baseline resting activity…";
        case CalibrationSensor.BACK:
          return "Keep your arms steady in front of you. \nMeasuring back muscle activity...";
        case CalibrationSensor.ABDOMINAL:
          return "Press down on your knees and engage your core. \nMeasuring abdominal muscle strength...";
      }
    };

    return (
      <View className={"flex flex-col items-center justify-center text-center"}>
        <StyledText
          className={"text-center text-light-50"}
          style={typography.body.regular}
        >
          {text()}
        </StyledText>
      </View>
    );
  };

  function getResults(): void {
    const calibrationResult = calibrationRef.current?.getResult();
    if (!calibrationResult) return;
    let data = [];
    switch (sensor) {
      case CalibrationSensor.BASELINE:
        data = calibrationResult.min;
        setCalibratedData(MIN_KEY, data);
        break;
      case CalibrationSensor.BACK:
        data = calibrationResult.max.splice(4, 2);
        setCalibratedData(BACK_KEY, data);
        break;
      case CalibrationSensor.ABDOMINAL:
        data = calibrationResult.max.splice(0, 4);
        setCalibratedData(ABNOMIAL_KEY, data);
        break;
    }
  }

  function onFinish() {
    setCalibrating(false);
    // stopNotify();
    getResults();
  }

  return (
    <View className={"flex flex-col gap-y-4"}>
      <View>
        <TimerBar time={30} onFinish={onFinish} />
      </View>
      <View className={"h-50 my-4 rounded-xl bg-dark-50 py-4"}>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <CalibrationChart
          ref={calibrationRef}
          sensor={sensor}
          next={() => {}}
        />
      </View>

      <View className={"flex flex-col items-center justify-center gap-y-2"}>
        {calibrating && (
          <>
            <StyledText style={typography.h1}>Calibrating...</StyledText>
            <ProgressText />
          </>
        )}

        {!calibrating && <StyledText>Step {sensor + 1} completed</StyledText>}
      </View>

      <Button disabled={calibrating} onPress={props.next}>
        CONTINUE
      </Button>
    </View>
  );
};

export default CalibrationCalibrating;
