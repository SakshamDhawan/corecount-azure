import { useEffect, useState } from "react";
import { View } from "react-native";

import type { CalibrateSensorProps } from "~/components/calibration/index";
import CalibrationCalibrating from "~/components/calibration/CalibrationCalibrating";
import CalibrationIntro from "~/components/calibration/CalibrationIntro";
import {
  CalibrationSensor,
  CalibrationSensorPhase,
} from "~/components/calibration/index";
import StyledText, { typography } from "~/components/styled/StyledText";

const CalibrateSensor = ({ sensor, ...props }: CalibrateSensorProps) => {
  const [phase, setPhase] = useState<CalibrationSensorPhase>(
    CalibrationSensorPhase.INTRO,
  );

  function onNext() {
    switch (phase) {
      case CalibrationSensorPhase.INTRO:
        setPhase(CalibrationSensorPhase.CALIBRATING);
        break;
      case CalibrationSensorPhase.CALIBRATING:
        props.next();
        if (sensor !== CalibrationSensor.ABDOMINAL)
          setPhase(CalibrationSensorPhase.INTRO);
        break;
    }
  }

  useEffect(() => {
    setPhase(CalibrationSensorPhase.INTRO);
  }, [sensor]);

  function headingText(): import("react").ReactNode {
    switch (sensor) {
      case CalibrationSensor.BASELINE:
        return "Step 1: Relax";
      case CalibrationSensor.BACK:
        return "Step 2: Activate your back muscles";
      case CalibrationSensor.ABDOMINAL:
        return "Step 3: Activate your abdominals";
    }
  }

  return (
    <View>
      <View
        className={"flex flex-col items-center justify-center gap-y-2 mb-4"}
      >
        <StyledText style={typography.h2}>{headingText()}</StyledText>
      </View>
      {phase === CalibrationSensorPhase.INTRO && (
        <CalibrationIntro sensor={sensor} next={onNext} />
      )}
      {phase === CalibrationSensorPhase.CALIBRATING && (
        <CalibrationCalibrating sensor={sensor} next={onNext} />
      )}
    </View>
  );
};

export default CalibrateSensor;
