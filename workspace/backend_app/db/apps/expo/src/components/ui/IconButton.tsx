import type { ComponentProps, ReactElement } from "react";
import type { SvgProps } from "react-native-svg";
import React from "react";
import { Pressable, View } from "react-native";
import { clsx } from "clsx";

type ButtonProps = ComponentProps<typeof Pressable> & {
  shape: "circle" | "square";
  size: "small" | "regular";
  icon?: any;
};

const Icon = ({ ...rest }): ReactElement<SvgProps> => {
  const getIconSize = () => {
    switch (rest.size) {
      case "small":
        return 24;
      case "regular":
        return 24;
    }
  };

  return <rest.icon {...rest} width={getIconSize()} height={getIconSize()} />;
};

const IconButton = ({ ...props }: ButtonProps) => {
  const getSize = () => {
    switch (props.size) {
      case "small":
        return 40;
      case "regular":
        return 56;
    }
  };

  return (
    <Pressable {...props}>
      <View
        style={{
          width: getSize(),
          height: getSize(),
          backgroundColor: props.shape === "square" ? "#01CFCC" : "#253C50",
          borderRadius: props.shape === "square" ? 6 : 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon {...props} stroke={clsx(props.shape === "square" ? "#152533" : "#01CFCC")} />
      </View>
    </Pressable>
  );
};

export default IconButton;
