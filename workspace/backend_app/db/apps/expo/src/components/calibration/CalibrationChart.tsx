import type { EmitterSubscription } from "react-native";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Dimensions } from "react-native";
import Animated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { G, Path, Svg } from "react-native-svg";
import { curveCardinal, line, scaleLinear } from "d3";

import { colors } from "@corecount/tailwind-config/constants";

import type { CalibrateSensorProps } from "~/components/calibration/index";
import { CalibrationSensor } from "~/components/calibration/index";
import useWearable from "~/context/useWearable";
import { Queue } from "~/utils/Queue";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);
const initDat = [{ x: 0, y: 0 }];
const initData = new Queue<DatPoint>(initDat, 10);

interface DatPoint {
  x: number;
  y: number;
}

export interface CalibrationChartRef {
  getResult: () => { min: number[]; max: number[] };
}

type CalibrationProps = CalibrateSensorProps;

const CalibrationChart = forwardRef(({ ...props }: CalibrationProps, ref) => {
  const { SensorEvents } = useWearable();

  const sensorListener = useRef<EmitterSubscription>();

  // Pass the ref to the useImperativeHandle hook
  useImperativeHandle(ref, () => ({
    getResult: () => ({
      min: minIMU.value,
      max: maxIMU.value,
    }),
  }));

  const maxIMU = useSharedValue<number[]>([0, 0, 0, 0, 0, 0]);
  const minIMU = useSharedValue<number[]>([
    Number.MAX_VALUE,
    Number.MAX_VALUE,
    Number.MAX_VALUE,
    Number.MAX_VALUE,
    Number.MAX_VALUE,
    Number.MAX_VALUE,
  ]);

  const maxPoints = 100;

  const dataPoints1 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));
  const dataPoints2 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));
  const dataPoints3 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));
  const dataPoints4 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));
  const dataPoints5 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));
  const dataPoints6 = useRef(new Queue<DatPoint>([{ x: 0, y: 0 }], maxPoints));

  useEffect(() => {
    sensorListener.current = SensorEvents.addListener("MMG", (data: number[]) => {
      const now = new Date().getTime();
      const newMax = maxIMU.value;
      const newMin = minIMU.value;
      for (let i = 0; i < 6; i++) {
        newMax[i] = Math.max(newMax[i], data[i]);
        newMin[i] = Math.min(newMin[i], data[i]);
      }
      minIMU.value = newMin;
      maxIMU.value = newMax;

      // Get average value of data
      dataPoints1.current.enqueue({ x: now, y: data[0] });
      dataPoints2.current.enqueue({ x: now, y: data[1] });
      dataPoints3.current.enqueue({ x: now, y: data[2] });
      dataPoints4.current.enqueue({ x: now, y: data[3] });
      dataPoints5.current.enqueue({ x: now, y: data[4] });
      dataPoints6.current.enqueue({ x: now, y: data[5] });

      pathGraph1.value = curvedLine(dataPoints1.current.getQueue());
      pathGraph2.value = curvedLine(dataPoints2.current.getQueue());
      pathGraph3.value = curvedLine(dataPoints3.current.getQueue());
      pathGraph4.value = curvedLine(dataPoints4.current.getQueue());
      pathGraph5.value = curvedLine(dataPoints5.current.getQueue());
      pathGraph6.value = curvedLine(dataPoints6.current.getQueue());

      const seconds = 5 * 1000;
      // Set new domains
      x.current.domain([now - seconds / 4, now - 100]);
      y.current.domain([0, Math.max(...newMax)]);
    });

    return () => {
      sensorListener.current?.remove();
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
    <Animated.View className={"flex"}>
      <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
        <G>
          {/*{y.current.ticks(3).map((yTick, i) => (*/}
          {/*  <View key={i}>*/}
          {/*    <Line*/}
          {/*      x1={leftPadding}*/}
          {/*      y1={y.current(yTick)}*/}
          {/*      x2={GRAPH_WIDTH}*/}
          {/*      y2={y.current(yTick)}*/}
          {/*      stroke={"#454545"}*/}
          {/*      strokeWidth="1"*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*))}*/}

          {/*{x.current.ticks(5).map((xTick, i) => (*/}
          {/*  <View key={i}>*/}
          {/*    <Line>*/}
          {/*      y1={GRAPH_HEIGHT}*/}
          {/*      x1={x.current(xTick)}*/}
          {/*      y2={0}*/}
          {/*      x2={x.current(xTick)}*/}
          {/*      stroke={"#d7d7d7"}*/}
          {/*      strokeWidth="1"*/}
          {/*    </Line>*/}
          {/*  </View>*/}
          {/*))}*/}
        </G>
        <AnimatedG>
          {(props.sensor === CalibrationSensor.ABDOMINAL || props.sensor === CalibrationSensor.BASELINE) && (
            <>
              <AnimatedPath animatedProps={animatedProps1} strokeWidth="1" stroke={colors.green} fill={"none"} />
              <AnimatedPath animatedProps={animatedProps2} strokeWidth="1" stroke={colors.green} fill={"none"} />
              <AnimatedPath animatedProps={animatedProps3} strokeWidth="1" stroke={colors.green} fill={"none"} />
              <AnimatedPath animatedProps={animatedProps4} strokeWidth="1" stroke={colors.green} fill={"none"} />
            </>
          )}
          {(props.sensor === CalibrationSensor.BACK || props.sensor === CalibrationSensor.BASELINE) && (
            <>
              <AnimatedPath animatedProps={animatedProps5} strokeWidth="1" stroke={colors.green} fill={"none"} />
              <AnimatedPath animatedProps={animatedProps6} strokeWidth="1" stroke={colors.green} fill={"none"} />
            </>
          )}
        </AnimatedG>
      </Svg>
    </Animated.View>
  );
});

export { CalibrationChart };
