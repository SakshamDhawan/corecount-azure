import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgPause = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="M7 18V6m10 12V6" />
  </Svg>
);
export default SvgPause;
