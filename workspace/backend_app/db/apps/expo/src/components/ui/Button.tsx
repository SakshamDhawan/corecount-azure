import type { ComponentProps, ReactNode } from "react";
import { Pressable, Text } from "react-native";
import clsx from "clsx";

import StyledText, { typography } from "~/components/styled/StyledText";

type ButtonProps = ComponentProps<typeof Pressable> & {
  label?: string;
  children: ReactNode;
};

const Button = ({ className, ...props }: ButtonProps) => {
  const { disabled } = props;

  return (
    <Pressable
      className={clsx(
        "flex h-14 grow items-center justify-center rounded-md",
        className,
      )}
      style={{
        backgroundColor: disabled ? "#253C50" : "#01CFCC",
      }}
      android_ripple={{ color: "dark" }}
      {...props}
    >
      <Text
        className={"text-center uppercase text-dark-80"}
        style={typography.button.semibold}
      >
        {props.children}
      </Text>
    </Pressable>
  );
};

export default Button;
