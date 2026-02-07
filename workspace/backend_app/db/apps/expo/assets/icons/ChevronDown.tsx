import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgChevronDown = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95" />
  </Svg>
);
export default SvgChevronDown;
