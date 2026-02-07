import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgDifficultyBase = (props: SvgProps) => (
  <Svg width={35} height={36} fill="none" {...props}>
    <G>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M18.333 6.313a.78.78 0 0 0-1.11-.141 10.1 10.1 0 0 0-3.671 6.407 7.8 7.8 0 0 1-1.769-1.78.78.78 0 0 0-1.195-.086 9.336 9.336 0 1 0 10.564-2.068 7.74 7.74 0 0 1-2.819-2.332m2.891 12.41a3.89 3.89 0 1 1-7.585-1.216c.651.483 1.4.84 2.212 1.038.22-1.42.926-2.72 1.997-3.678a3.89 3.89 0 0 1 3.376 3.856"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);
export default SvgDifficultyBase;
