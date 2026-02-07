import type { ComponentProps, ReactNode } from "react";
import { Pressable } from "react-native";

import SVGImage from "../../assets/icons/plus-circle.svg";

type ButtonProps = ComponentProps<typeof Pressable> & {
  icon: ReactNode;
};

const Icon = ({ ...props }: ButtonProps) => {
  return (
    <Pressable {...props} className={"m-auto size-12 rounded-full bg-green"}>
      <SVGImage width={32} height={32} />
    </Pressable>
  );
};

export default Icon;
