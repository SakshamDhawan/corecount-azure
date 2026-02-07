import type { ComponentProps, ReactElement, ReactNode } from "react";
import type { SvgProps } from "react-native-svg";
import React from "react";
import { Pressable, View } from "react-native";

import { ChevronRight } from "~/assets/icons";
import StyledText from "./styled/StyledText";

type ButtonProps = ComponentProps<typeof Pressable> & {
  icon?: any;
  type?: string;
  children: ReactNode;
};

const Icon = ({ ...rest }): ReactElement<SvgProps> => {
  if (rest.icon)
    // @ts-ignore
    return <rest.icon {...rest} width={24} height={24} />;
  return <></>;
};

const Action = ({ ...props }: ButtonProps) => {
  return (
    <Pressable
      {...props}
      className={"flex h-14 w-full flex-row items-center gap-4 rounded-md p-4"}
      style={{
        backgroundColor: props.type == "red" ? "#f00" : "#425A6E",
      }}
    >
      <View>
        <Icon {...props} className={"h-5 w-5"} stroke="#01CFCC" />
      </View>
      <StyledText className={"flex-grow uppercase text-white"} style={{ fontWeight: "normal" }}>
        {props.children}
      </StyledText>
      <View>
        <ChevronRight stroke={"#fff"} />
      </View>
    </Pressable>
  );
};

export default Action;
