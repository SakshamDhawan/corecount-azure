import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Animated, {
  useAnimatedProps,
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
import { Queue } from "~/utils/Queue";

const { width } = Dimensions.get("screen");
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
import { G, Line, Path, Svg, Text } from "react-native-svg";

const CARD_WIDTH = width;
const GRAPH_WIDTH = CARD_WIDTH - 56;
const GRAPH_HEIGHT = 32;
import { curveCardinal, line, scaleLinear } from "d3";
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);
const initDat = [{ x: 0, y: 0 }];

const initData = new Queue<DatPoint>(initDat, 10);

interface AnimatedSensorProps {
  sensor: SensorsType;
  strength: number;
  target: number;
  updateState: (above: boolean) => void;
  idx: number;
  phase: any;
  countdownValue: number;
}
interface DatPoint {
  x: number;
  y: number;
}

const sensorColors = {
  Transversus: "#ffae21",
  IMU: colors.green,
  Spinal: "#01cfcb",
  Rectus: "#9d7cff",
};

const AnimatedSensorGraph = ({
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

  const dataPoints = useRef(
    new Queue<DatPoint>([{ x: new Date().getTime(), y: 0 }], 500),
  );

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
          const now = new Date().getTime();
          dataPoints.current.enqueue({
            x: now,
            y: (data[0] + MAX_INT / 2) / MAX_INT,
          });

          const seconds = 7 * 1000;

          x.current.domain([now - seconds / 4, now - 100]);
          y.current.domain([0, 1]);

          pathGraph.value = curvedLine(dataPoints.current.getQueue());

          value.value = (data[0] + MAX_INT / 2) / MAX_INT;
        },
      );
    } else {
      SensorEvents.addListener(
        "MMG",
        (data: [number, number, number, number, number, number]) => {
          const now = new Date().getTime();
          if (sensor === "Transversus") {
            const newVal = (data[0] + data[3]) / 2;
            const calibratedABDO1 =
              (calibratedABDO[0] -
                calibratedMin[0] +
                calibratedABDO[3] -
                calibratedMin[3]) /
              2;

            const curVal = newVal / calibratedABDO1;
            value.value = curVal;
            dataPoints.current.enqueue({
              x: now,
              y: curVal,
            });

            const seconds = 7 * 1000;

            x.current.domain([now - seconds / 4, now + 100]);
            y.current.domain([0, 1]);

            pathGraph.value = curvedLine(dataPoints.current.getQueue());
          } else if (sensor === "Rectus") {
            const newVal = (data[1] + data[2]) / 2;
            const calibratedABDO2 =
              (calibratedABDO[1] -
                calibratedMin[1] +
                calibratedABDO[2] -
                calibratedMin[2]) /
              2;

            const curVal = newVal / calibratedABDO2;
            value.value = curVal;

            dataPoints.current.enqueue({
              x: now,
              y: curVal,
            });

            const seconds = 7 * 1000;

            x.current.domain([now - seconds / 4, now + 100]);
            y.current.domain([0, 1]);
            pathGraph.value = curvedLine(dataPoints.current.getQueue());

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          } else if (sensor === "Spinal") {
            const range1 = calibratedBACK[0] - calibratedMin[4];
            const sensor1 = (data[4] - calibratedMin[4]) / range1;
            const range2 = calibratedBACK[1] - calibratedMin[5];
            const sensor2 = (data[5] - calibratedMin[5]) / range2;

            const val = (sensor1 + sensor2) / 2;
            value.value = val;
            dataPoints.current.enqueue({
              x: now,
              y: val,
            });
            const seconds = 7 * 1000;

            x.current.domain([now - seconds / 4, now + 100]);
            y.current.domain([0, 1]);

            pathGraph.value = curvedLine(dataPoints.current.getQueue());
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

  const width = Dimensions.get("window").width;
  const margin = 0;

  const CARD_WIDTH = width - 26;
  const GRAPH_WIDTH = CARD_WIDTH - 32;
  const GRAPH_HEIGHT = 100;

  const y = useRef(
    scaleLinear()
      .domain([0, 10])
      .range([GRAPH_HEIGHT - margin, margin]),
  );
  const x = useRef(
    scaleLinear()
      .domain([0, 5000])
      .range([margin, GRAPH_WIDTH - margin]),
  );

  const curvedLine = line<DatPoint>()
    .x((d: DatPoint) => x.current(d.x))
    .y((d: DatPoint) => y.current(d.y))
    .curve(curveCardinal);

  const pathGraph = useSharedValue(curvedLine(initData.getQueue()));

  const animatedProps1 = useAnimatedProps(() => ({ d: pathGraph.value }));

  return (
    <Animated.View>
      <View className={"flex flex-row justify-between"}>
        <StyledText className={"text-dark-20"}>
          {getSensorName(sensor)}
        </StyledText>
      </View>
      <View className={"h-50 my-4 rounded-xl bg-dark-50 py-4"}>
        <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
          <AnimatedG>
            <AnimatedPath
              animatedProps={animatedProps1}
              strokeWidth="2"
              stroke={colors.green}
              fill={"none"}
            />
          </AnimatedG>

          <Line
            x1={0}
            y1={GRAPH_HEIGHT - strength * 10 - 10}
            x2={width}
            y2={GRAPH_HEIGHT - strength * 10 - 10}
            stroke={colors.dark["80"]}
            strokeWidth="1"
          />
        </Svg>
      </View>
    </Animated.View>
  );
};

export default AnimatedSensorGraph;
