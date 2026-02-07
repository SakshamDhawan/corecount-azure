import type { ReactNode } from "react";
import React from "react";
import { View } from "react-native";
import { clsx } from "clsx";

import StyledText, { typography } from "~/components/styled/StyledText";

type CardProps = React.ComponentProps<typeof View> & {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

const TitleBar = ({ ...props }: CardProps) => {
  return (
    <View className={clsx("flex min-h-20 flex-row p-4", props.className)}>
      {props.iconLeft ? <View className={"min-w-11"}>{props.iconLeft}</View> : <View className={"min-w-11"}></View>}
      <View className={"flex-grow justify-center"}>
        <StyledText className={"text-center text-light-10"} style={typography.h5}>
          {props.children}
        </StyledText>
      </View>
      {props.iconRight ? <View>{props.iconRight}</View> : <View className={"min-w-11"}></View>}
    </View>
  );
};

export default TitleBar;
