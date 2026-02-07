import type { FC } from "react";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Defs, G, Line, LinearGradient, Rect, Text as ReText, Stop, Svg } from "react-native-svg";
import { scaleLinear, scaleTime } from "d3";

import type { DataPoint } from "~/components/UserGraph";
import StyledText from "~/components/styled/StyledText";

interface LineChartProps {
  height: number;
  width: number;
  data: DataPoint[];
  leftPadding: number;
  bottomPadding: number;
}

// const AnimatedPath = Animated.createAnimatedComponent(Path);
const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BarChart: FC<LineChartProps> = ({ height, width, data, bottomPadding, leftPadding }) => {
  const CARD_WIDTH = width - 20;
  const GRAPH_WIDTH = CARD_WIDTH - 60;
  const GRAPH_HEIGHT = 125;

  const max = Math.max(...data.map((val) => val.duration));
  const min = Math.min(...data.map((val) => val.duration));
  const y = scaleLinear().domain([0, max]).range([35, GRAPH_HEIGHT]);

  const maxDate = Math.max(...data.map((val) => val.date.toMillis()));
  const minDate = Math.min(...data.map((val) => val.date.toMillis()));

  const x = scaleTime()
    .domain([minDate, maxDate])
    .range([10, GRAPH_WIDTH - 10]);

  // y.ticks(7).map((yTick) => console.log);

  return (
    <SafeAreaView style={styles.container} className={"rounded-2xl bg-dark-70"}>
      <View style={styles.titleContainer}>
        <StyledText style={styles.titleText}>Test</StyledText>
        <StyledText style={styles.priceText} />
      </View>
      <Animated.View style={styles.chartContainer}>
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="red" stopOpacity="1" />
              <Stop offset="1" stopColor="#FFD080" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <G y={bottomPadding}>
            {y.ticks(4).map((yTick, i) => (
              <View key={i}>
                <ReText x={0} y={GRAPH_HEIGHT - y(yTick)} stroke={"#253C50"} strokeWidth="1">
                  {yTick}
                </ReText>
                <Line
                  x1={leftPadding}
                  y1={GRAPH_HEIGHT - y(yTick)}
                  x2={width}
                  y2={GRAPH_HEIGHT - y(yTick)}
                  stroke={"#253C50"}
                  strokeWidth="1"
                />
              </View>
            ))}

            {data.map((d, i) => (
              <Rect
                key={i}
                rx={3}
                x={leftPadding + x(d.date)}
                width={20}
                height={y(d.duration) - 34}
                y={GRAPH_HEIGHT - y(d.duration)}
                fill="url(#grad)"
              />
            ))}

            {x.ticks(7).map((xTick, i) => (
              <ReText
                key={i}
                stroke={"#000"}
                strokeWidth={1}
                fill={"none"}
                x={leftPadding + x(xTick)}
                alignmentBaseline={"center"}
                y={0}
              >
                {weekday[xTick.getDay()]}
              </ReText>
            ))}

            {/*<AnimatedPath animatedProps={animatedProps} strokeWidth="2"/>*/}
          </G>
        </Svg>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    marginHorizontal: 30,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BarChart;
