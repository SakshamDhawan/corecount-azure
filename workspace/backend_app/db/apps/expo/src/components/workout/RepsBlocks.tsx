import { Component } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import StyledText from "~/components/styled/StyledText";

interface WorkoutReps {
  current: number;
  total: number;
}

class RepsBlock extends Component<WorkoutReps> {
  render() {
    return (
      <View className={"flex w-full flex-row justify-evenly gap-1"}>
        {new Array(this.props.total).fill(0).map((_, i) => (
          <StyledText
            style={{ backgroundColor: i < this.props.current ? "#9E7CFF" : "rgba(255,255,255,0.22)" }}
            className={
              "flex aspect-square max-h-4 grow flex-row gap-2 rounded transition-colors duration-500 ease-in-out"
            }
          />
        ))}
      </View>
    );
  }
}

const AnimatedRepsBlock = Animated.createAnimatedComponent(RepsBlock);

export { AnimatedRepsBlock };
