import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgPlusCircle = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="M12 8v8m-4-4h8m6 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10" />
  </Svg>
);
export default SvgPlusCircle;
