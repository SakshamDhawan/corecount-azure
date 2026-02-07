import type { DateTime } from "luxon";
import { Animated, Dimensions, View } from "react-native";
import { StyleSheet } from "react-native-css-interop";

import BarChart from "~/components/BarChart";

const { width } = Dimensions.get("screen");

const CARD_WIDTH = width;
const GRAPH_WIDTH = CARD_WIDTH - 60;
const CARD_HEIGHT = 200;
const GRAPH_HEIGHT = 200;

export interface DataPoint {
  date: DateTime;
  duration: number;
}

interface UserGraphProps {
  weekdays: {
    date: DateTime;
    duration: number;
  }[];
}

const UserGraph = ({ ...props }: UserGraphProps) => {
  const graphData = props.weekdays;

  return (
    <View>
      <Animated.View style={styles.graphCard}>
        <BarChart height={GRAPH_HEIGHT} width={GRAPH_WIDTH} data={graphData} bottomPadding={20} leftPadding={50} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  graphCard: {
    elevation: 5,
    borderRadius: 20,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default UserGraph;
