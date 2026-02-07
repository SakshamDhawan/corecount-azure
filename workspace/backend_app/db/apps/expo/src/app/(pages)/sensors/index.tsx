import type { EmitterSubscription } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { G, Line, Path, Svg } from "react-native-svg";
import { router } from "expo-router";
import { curveCardinal, line, scaleLinear } from "d3";

import { colors } from "@corecount/tailwind-config/constants";

import { ChevronLeft, Placeholder } from "~/assets/icons";
import StyledText from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import IconButton from "~/components/ui/IconButton";
import useWearable, { WearableProvider } from "~/context/useWearable";
import {
  ABNOMIAL_KEY,
  BACK_KEY,
  getCalibratedData,
  MIN_KEY,
} from "~/services/CalibrationService";
import { Queue } from "~/utils/Queue";
import GlobalLayout from "~/components/ui/GlobalLayout";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);
const initDat = [{ x: 0, y: 0 }];
const initData = new Queue<DatPoint>(initDat, 10);

const { width } = Dimensions.get("screen");

const CARD_WIDTH = width;
const GRAPH_WIDTH = CARD_WIDTH - 56;
const GRAPH_HEIGHT = 32;

interface SensorsProps {}
interface DatPoint {
  x: number;
  y: number;
}
const AnimatedSensor = ({ ...props }: SensorsProps) => {
  const { SensorEvents, notify, stopNotify } = useWearable();
  const sensorListener = useRef<EmitterSubscription>();

  const maxPoints = 100;

  const calibratedMin: number[] = getCalibratedData(MIN_KEY);
  const calibratedABDO = getCalibratedData(ABNOMIAL_KEY);
  const calibratedBACK = getCalibratedData(BACK_KEY);

  const dataPoints1 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));
  const dataPoints2 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));
  const dataPoints3 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));
  const dataPoints4 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));
  const dataPoints5 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));
  const dataPoints6 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));

  useEffect(() => {
    notify();
    sensorListener.current = SensorEvents.addListener(
      "MMG",
      (data: number[]) => {
        const now = new Date().getTime();

        // Get average value of data
        // console.log(data[0] / calibratedABDO[0]);

        dataPoints1.current.enqueue({
          x: now,
          y: Math.min(1, data[0] / calibratedABDO[0]),
        });
        dataPoints2.current.enqueue({
          x: now,
          y: Math.min(1, data[1] / calibratedABDO[1]),
        });
        dataPoints3.current.enqueue({
          x: now,
          y: Math.min(1, data[2] / calibratedABDO[2]),
        });
        dataPoints4.current.enqueue({
          x: now,
          y: Math.min(1, data[3] / calibratedABDO[3]),
        });
        dataPoints5.current.enqueue({
          x: now,
          y: Math.min(1, data[4] / calibratedBACK[0]),
        });
        dataPoints6.current.enqueue({
          x: now,
          y: Math.min(1, data[5] / calibratedBACK[1]),
        });

        pathGraph1.value = curvedLine(dataPoints1.current.getQueue());
        pathGraph2.value = curvedLine(dataPoints2.current.getQueue());
        pathGraph3.value = curvedLine(dataPoints3.current.getQueue());
        pathGraph4.value = curvedLine(dataPoints4.current.getQueue());
        pathGraph5.value = curvedLine(dataPoints5.current.getQueue());
        pathGraph6.value = curvedLine(dataPoints6.current.getQueue());

        const seconds = 5 * 1000;
        // Set new domains
        x.current.domain([now - seconds / 4, now - 100]);
        y.current.domain([0, 1]);
      },
    );

    return () => {
      sensorListener.current?.remove();
      stopNotify();
    };
  }, []);

  const width = Dimensions.get("window").width;
  const margin = 20;

  const CARD_WIDTH = width - 26;
  const GRAPH_WIDTH = CARD_WIDTH;
  const GRAPH_HEIGHT = 200;

  const y = useRef(
    scaleLinear()
      .domain([0, 10])
      .range([GRAPH_HEIGHT - margin, margin]),
  );
  const x = useRef(
    scaleLinear()
      .domain([0, 5])
      .range([margin, GRAPH_WIDTH - margin]),
  );

  const curvedLine = line<DatPoint>()
    .x((d: DatPoint) => x.current(d.x))
    .y((d: DatPoint) => y.current(d.y))
    .curve(curveCardinal);

  const pathGraph1 = useSharedValue(curvedLine(initData.getQueue()));
  const pathGraph2 = useSharedValue(curvedLine(initData.getQueue()));
  const pathGraph3 = useSharedValue(curvedLine(initData.getQueue()));
  const pathGraph4 = useSharedValue(curvedLine(initData.getQueue()));
  const pathGraph5 = useSharedValue(curvedLine(initData.getQueue()));
  const pathGraph6 = useSharedValue(curvedLine(initData.getQueue()));

  const animatedProps1 = useAnimatedProps(() => ({ d: pathGraph1.value }));
  const animatedProps2 = useAnimatedProps(() => ({ d: pathGraph2.value }));
  const animatedProps3 = useAnimatedProps(() => ({ d: pathGraph3.value }));
  const animatedProps4 = useAnimatedProps(() => ({ d: pathGraph4.value }));
  const animatedProps5 = useAnimatedProps(() => ({ d: pathGraph5.value }));
  const animatedProps6 = useAnimatedProps(() => ({ d: pathGraph6.value }));

  return (
    <GlobalLayout>
      <TitleBar
        iconLeft={
          <IconButton
            shape={"circle"}
            onPress={() => router.back()}
            size={"small"}
            icon={ChevronLeft}
          />
        }
        // iconRight={<IconButton shape={"circle"} size={"small"} icon={Placeholder} />}
      >
        YOUR SENSORS
      </TitleBar>
      <ScrollView className={"p-4"}>
        <Animated.View className={"flex"}>
          <View className={"h-50 my-4 rounded-xl bg-dark-50 py-4"}>
            <StyledText>Right Deep Core</StyledText>
            <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
              {y.current.ticks(4).map((yTick, i) => (
                <View key={i}>
                  <Line
                    x1={0}
                    y1={GRAPH_HEIGHT - y.current(yTick)}
                    x2={width}
                    y2={GRAPH_HEIGHT - y.current(yTick)}
                    stroke={colors.dark["40"]}
                    strokeWidth="1"
                  />
                </View>
              ))}
              <AnimatedG>
                <AnimatedPath
                  animatedProps={animatedProps1}
                  strokeWidth="2"
                  stroke={colors.green}
                  fill={"none"}
                />
              </AnimatedG>
            </Svg>
          </View>
          <View className={"h-50 my-4 rounded-xl bg-dark-50 py-4"}>
            <StyledText>Right Abs</StyledText>
            <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
              {y.current.ticks(4).map((yTick, i) => (
                <View key={i}>
                  <Line
                    x1={0}
                    y1={GRAPH_HEIGHT - y.current(yTick)}
                    x2={width}
                    y2={GRAPH_HEIGHT - y.current(yTick)}
                    stroke={colors.dark["40"]}
                    strokeWidth="1"
                  />
                </View>
              ))}
              <AnimatedG>
                <AnimatedPath
                  animatedProps={animatedProps2}
                  strokeWidth="1"
                  stroke={colors.green}
                  fill={"none"}
                />
              </AnimatedG>
            </Svg>
          </View>
          <View className={"h-50 my-4 rounded-xl bg-dark-50 py-4"}>
            <StyledText>Left Abs</StyledText>
            <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
              {y.current.ticks(4).map((yTick, i) => (
                <View key={i}>
                  <Line
                    x1={0}
                    y1={GRAPH_HEIGHT - y.current(yTick)}
                    x2={width}
                    y2={GRAPH_HEIGHT - y.current(yTick)}
                    stroke={colors.dark["40"]}
                    strokeWidth="1"
                  />
                </View>
              ))}
              <AnimatedG>
                <AnimatedPath
                  animatedProps={animatedProps3}
                  strokeWidth="1"
                  stroke={colors.green}
                  fill={"none"}
                />
              </AnimatedG>
            </Svg>
          </View>
          <View className={"h-50 my-4 rounded-xl bg-dark-50 py-4"}>
            <StyledText>Left Deep Core</StyledText>
            <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
              {y.current.ticks(4).map((yTick, i) => (
                <View key={i}>
                  <Line
                    x1={0}
                    y1={GRAPH_HEIGHT - y.current(yTick)}
                    x2={width}
                    y2={GRAPH_HEIGHT - y.current(yTick)}
                    stroke={colors.dark["40"]}
                    strokeWidth="1"
                  />
                </View>
              ))}
              <AnimatedG>
                <AnimatedPath
                  animatedProps={animatedProps4}
                  strokeWidth="1"
                  stroke={colors.green}
                  fill={"none"}
                />
              </AnimatedG>
            </Svg>
          </View>
          <View className={"h-50 my-4 rounded-xl bg-dark-50 py-4"}>
            <StyledText>Left Spine</StyledText>
            <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
              {y.current.ticks(4).map((yTick, i) => (
                <View key={i}>
                  <Line
                    x1={0}
                    y1={GRAPH_HEIGHT - y.current(yTick)}
                    x2={width}
                    y2={GRAPH_HEIGHT - y.current(yTick)}
                    stroke={colors.dark["40"]}
                    strokeWidth="1"
                  />
                </View>
              ))}
              <AnimatedG>
                <AnimatedPath
                  animatedProps={animatedProps5}
                  strokeWidth="1"
                  stroke={colors.green}
                  fill={"none"}
                />
              </AnimatedG>
            </Svg>
          </View>
          <View className={"h-50 my-4 rounded-xl bg-dark-50 py-4"}>
            <StyledText>Right Spine</StyledText>
            <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
              {y.current.ticks(4).map((yTick, i) => (
                <View key={i}>
                  <Line
                    x1={0}
                    y1={GRAPH_HEIGHT - y.current(yTick)}
                    x2={width}
                    y2={GRAPH_HEIGHT - y.current(yTick)}
                    stroke={colors.dark["40"]}
                    strokeWidth="1"
                  />
                </View>
              ))}
              <AnimatedG>
                <AnimatedPath
                  animatedProps={animatedProps6}
                  strokeWidth="1"
                  stroke={colors.green}
                  fill={"none"}
                />
              </AnimatedG>
            </Svg>
          </View>
          <View className={"h-50 my-4 rounded-xl bg-dark-50 py-4"} />
        </Animated.View>
      </ScrollView>
    </GlobalLayout>
  );
};

const Index = () => {
  return (
    <WearableProvider>
      <AnimatedSensor />
    </WearableProvider>
  );
};

export default Index;
