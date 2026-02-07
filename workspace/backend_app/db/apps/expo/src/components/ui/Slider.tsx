import * as React from "react";
import { View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

import StyledText from "~/components/styled/StyledText";

type SliderProps = React.ComponentProps<typeof Slider>;

const MySlider = ({ ...props }: SliderProps) => {
  const { trackMarks } = props;

  return (
    <Slider
      {...props}
      trackStyle={{ backgroundColor: "#253C50" }}
      minimumTrackStyle={{ backgroundColor: "#152533" }}
      thumbStyle={{ backgroundColor: "#fff" }}
      trackClickable={true}
      renderTrackMarkComponent={(idx) => (
        <View className={"relative flex"}>
          <View className={"absolute -bottom-8"}>
            <StyledText>{trackMarks?.[idx]}</StyledText>
          </View>
        </View>
      )}
    />
  );
};

export default MySlider;
