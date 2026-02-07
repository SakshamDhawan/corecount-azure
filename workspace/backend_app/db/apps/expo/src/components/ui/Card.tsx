import type { ComponentProps } from "react";
import { View } from "react-native";
import clsx from "clsx";

type CardProps = ComponentProps<typeof View> & {};

const Card = ({ ...props }: CardProps) => {
  return <View className={clsx("rounded-xl bg-dark-40 p-8", props.className)}>{props.children}</View>;
};

export default Card;
