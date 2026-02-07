import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgPlayFilled = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#000"
      d="M14.895 3.837c4.56 2.68 6.84 4.018 7.605 5.767a5.99 5.99 0 0 1 0 4.792c-.766 1.749-3.046 3.088-7.605 5.767-4.56 2.678-6.84 4.017-8.71 3.817a5.77 5.77 0 0 1-4.08-2.396C1 20.036 1 17.357 1 12s0-8.036 1.106-9.584A5.77 5.77 0 0 1 6.184.02c1.871-.2 4.151 1.139 8.71 3.817"
    />
  </Svg>
);
export default SvgPlayFilled;
