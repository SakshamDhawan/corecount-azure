import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgTarget = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10" />
    <Path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12" />
    <Path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
  </Svg>
);
export default SvgTarget;
