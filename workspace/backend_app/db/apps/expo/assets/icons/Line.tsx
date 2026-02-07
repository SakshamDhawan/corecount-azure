import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgLine = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="M1 12h5.5l1.941-4.496L12.006 16l3.005-6.551L16.719 12H23" />
  </Svg>
);
export default SvgLine;
