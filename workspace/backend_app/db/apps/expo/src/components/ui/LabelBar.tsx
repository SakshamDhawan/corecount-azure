import React from "react";
import { View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import StyledText, { typography } from "~/components/styled/StyledText";

interface LabelBarProps {
  label?: string;
  actions?: {
    label?: string;
    onClick?: () => void;
  };
}

const LabelBar = ({ label, actions }: LabelBarProps) => {
  const onClick = () => {
    if (actions?.onClick) {
      actions.onClick();
    } else {
      console.log("Not implemented");
    }
  };

  return (
    <View className={"flex flex-row items-center justify-between py-4"}>
      <StyledText className={"uppercase text-dark-20"} style={typography.body.semibold}>
        {label ?? "LABEL"}
      </StyledText>
      {actions && (
        <StyledText onPress={onClick} className={"uppercase text-green"} style={typography.button.small.regular}>
          {actions.label ?? "VIEW MORE"} <FontAwesome6 name={"arrow-right"} width={20} height={20} />
        </StyledText>
      )}
    </View>
  );
};

export default LabelBar;
