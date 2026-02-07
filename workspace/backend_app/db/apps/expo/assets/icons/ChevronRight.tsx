import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgChevronRight = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="m8.91 19.92 6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08" />
  </Svg>
);
export default SvgChevronRight;
