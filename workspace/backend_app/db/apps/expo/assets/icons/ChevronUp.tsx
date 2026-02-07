import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgChevronUp = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="M19.92 15.05 13.4 8.53c-.77-.77-2.03-.77-2.8 0l-6.52 6.52" />
  </Svg>
);
export default SvgChevronUp;
