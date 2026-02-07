import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgPlay = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="M15.105 5.878c3.316 2.01 4.974 3.014 5.531 4.325a4.62 4.62 0 0 1 0 3.594c-.556 1.311-2.215 2.316-5.53 4.325-3.317 2.009-4.975 3.013-6.336 2.863-1.186-.13-2.264-.784-2.966-1.797C5 18.027 5 16.018 5 12s0-6.027.804-7.188c.702-1.013 1.78-1.666 2.966-1.797 1.361-.15 3.02.854 6.335 2.863" />
  </Svg>
);
export default SvgPlay;
