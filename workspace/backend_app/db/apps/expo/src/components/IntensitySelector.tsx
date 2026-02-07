import React, { useEffect } from "react";
import { Pressable, View } from "react-native";

import type { Intensity } from "~/components/Intensity";
import { IntensityProfiles } from "~/components/Intensity";
import StyledText from "~/components/styled/StyledText";
import MyCheckbox from "~/components/ui/Checkbox";

interface IntensitySelectorProps {
  onChange: (intensity: Intensity) => void;
}

const IntensitySelector = ({ ...props }) => {
  const [level, setLevel] = React.useState<string>();

  useEffect(() => {
    props.onChange(level);
  }, [level]);

  return (
    <View style={{ borderColor: "rgba(255,255,255,0.25)" }} className={"rounded-xl border"}>
      {IntensityProfiles.map((plan) => (
        <Pressable
          onPress={() => setLevel(plan.id)}
          style={{
            backgroundColor: plan.id === level ? "#1B3042" : "#0D1623",
          }}
          key={plan.id}
          className="relative flex flex-row items-start"
        >
          <View className="my-auto flex h-6 items-center">
            <MyCheckbox checked={plan.id === level} onChange={() => setLevel(plan.id)} />
          </View>
          <View className="ml-3 text-sm leading-6">
            <StyledText style={{ fontFamily: "Chillax-Regular" }} className={"uppercase text-dark-20"}>
              {plan.name}
            </StyledText>
            <StyledText style={{ fontFamily: "Chillax-Regular" }} className={"text-light-10"}>
              <StyledText style={{ color: plan.color, fontWeight: "bold" }}>{plan.reps}</StyledText> Reps
              <StyledText className={"text-dark-40"}>|</StyledText>
              <StyledText style={{ color: plan.color, fontWeight: "bold" }}>{plan.intensity}</StyledText> Intensity
            </StyledText>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default IntensitySelector;
