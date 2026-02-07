import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgChart = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="M16 11v6M12 7v10m-4-4v4m4 4c-3.75 0-5.625 0-6.939-.955a5 5 0 0 1-1.106-1.106C3 17.625 3 15.749 3 12s0-5.625.955-6.939A5 5 0 0 1 5.06 3.955C6.375 3 8.251 3 12 3s5.625 0 6.939.955a5 5 0 0 1 1.106 1.106C21 6.375 21 8.251 21 12s0 5.625-.955 6.939a5 5 0 0 1-1.106 1.106C17.625 21 15.749 21 12 21" />
  </Svg>
);
export default SvgChart;
