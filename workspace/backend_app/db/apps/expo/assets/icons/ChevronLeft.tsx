import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgChevronLeft = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <Path d="M15 19.92 8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08" />
  </Svg>
);
export default SvgChevronLeft;
