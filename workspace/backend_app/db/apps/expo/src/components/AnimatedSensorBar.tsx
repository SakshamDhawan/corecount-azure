import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import type { SensorsType } from "@corecount/dbprisma/zod";

import StyledText from "~/components/styled/StyledText";
import useWearable from "~/context/useWearable";
import {
  ABNOMIAL_KEY,
  BACK_KEY,
  getCalibratedData,
  MIN_KEY,
} from "~/services/CalibrationService";
import { colors } from "@corecount/tailwind-config/constants";

const { width } = Dimensions.get("screen");
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const CARD_WIDTH = width;
const GRAPH_WIDTH = CARD_WIDTH - 56;
const GRAPH_HEIGHT = 32;

interface AnimatedSensorProps {
  sensor: SensorsType;
  strength: number;
  target: number;
  updateState: (above: boolean) => void;
  idx: number;
}

const sensorColors = {
  Transversus: "#ffae21",
  IMU: colors.green,
  Spinal: "#01cfcb",
  Rectus: "#9d7cff",
};

const AnimatedSensorBar = ({
  sensor,
  target,
  strength,
  idx,
  ...props
}: AnimatedSensorProps) => {
  const { SensorEvents } = useWearable();
  const MAX_INT = 32767;

  const value = useSharedValue(0);
  const requestId = useRef<number>(-1);

  const aboveSensor = useSharedValue(false);
  const [above, setAbove] = useState(false);

  const calibratedMin = getCalibratedData(MIN_KEY);
  const calibratedABDO = getCalibratedData(ABNOMIAL_KEY);
  const calibratedBACK = getCalibratedData(BACK_KEY);

  const handleFrame = (_timestamp: number) => {
    const curVal = value.value * 100;

    if (aboveSensor.value && Math.round(curVal) < target) {
      aboveSensor.value = false;
      setAbove(false);
    } else if (!aboveSensor.value && Math.round(curVal) > target) {
      aboveSensor.value = true;
      setAbove(true);
    }

    requestId.current = requestAnimationFrame(handleFrame);
  };

  useEffect(() => {
    props.updateState(above);
  }, [above]);

  useEffect(() => {
    if (sensor === "IMU") {
      SensorEvents.addListener(
        "IMU",
        (data: [number, number, number, number, number, number]) => {
          value.value = (data[0] + MAX_INT / 2) / MAX_INT;
        },
      );
    } else {
      SensorEvents.addListener(
        "MMG",
        (data: [number, number, number, number, number, number]) => {
          if (sensor === "Transversus") {
            const newVal = (data[0] + data[3]) / 2;
            const calibratedABDO1 =
              (calibratedABDO[0] -
                calibratedMin[0] +
                calibratedABDO[3] -
                calibratedMin[3]) /
              2;
            value.value = newVal / calibratedABDO1 / 50;
          } else if (sensor === "Rectus") {
            const newVal = (data[1] + data[2]) / 2;
            const calibratedABDO2 =
              (calibratedABDO[1] -
                calibratedMin[1] +
                calibratedABDO[2] -
                calibratedMin[2]) /
              2;
            value.value = newVal / calibratedABDO2 / 50;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          } else if (sensor === "Spinal") {
            const range1 = calibratedBACK[0] - calibratedMin[4];
            const sensor1 = (data[4] - calibratedMin[4]) / range1;
            const range2 = calibratedBACK[1] - calibratedMin[5];
            const sensor2 = (data[5] - calibratedMin[5]) / range2;

            const val = (sensor1 + sensor2) / 2;
            value.value = val;
          }
        },
      );
    }

    requestId.current = requestAnimationFrame(handleFrame);
    return () => {
      cancelAnimationFrame(requestId.current);
      SensorEvents.removeAllListeners();
    };
  }, []);

  const animatedBar = useAnimatedStyle(() => {
    return { width: value.value * GRAPH_WIDTH };
  });

  // const animatedTarget = useAnimatedStyle(() => {
  //   const upper = target / 100 + 0.05;
  //   const lower = target / 100 - 0.05;
  //   const resp = value.value < upper && value.value > lower;
  //
  //   return { opacity: resp ? 100 : 0 };
  // });

  function getSensorName(sensor: SensorsType) {
    switch (sensor) {
      case "IMU":
        return "IMU";
      case "Spinal":
        return "Spine";
      case "Transversus":
        return "Deep Core";
      case "Rectus":
        return "Abs";
    }
  }

  return (
    <Animated.View>
      <View className={"flex flex-row justify-between"}>
        <StyledText className={"text-dark-20"}>
          {getSensorName(sensor)}
        </StyledText>
        {/*<StyledText className={"text-dark-20"}>*/}
        {/*  Current <StyledText>{text}</StyledText>*/}
        {/*  Target: <StyledText>{target}% </StyledText>*/}
        {/*</StyledText>*/}
      </View>

      <View className={"relative bg-dark-40"} style={{ borderRadius: 4 }}>
        <AnimatedLinearGradient
          colors={[sensorColors[sensor], sensorColors[sensor]]}
          start={{ x: 0, y: 0 }}
          style={[{ height: 32, borderRadius: 4 }, animatedBar]}
        />
        <View
          style={{
            marginLeft: (target / 100) * GRAPH_WIDTH - 54 / 2,
            width: 54,
            height: 32,
          }}
          className={"absolute"}
        >
          <AnimatedLinearGradient
            colors={[colors.dark["80"], colors.dark["80"]]}
            start={{ x: 0, y: 0 }}
            style={[{ height: 32, width: 3 }]}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default AnimatedSensorBar;
