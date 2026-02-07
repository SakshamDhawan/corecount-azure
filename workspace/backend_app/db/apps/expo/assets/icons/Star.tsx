import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgStar = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="M11.129 4.049a1 1 0 0 1 1.742 0l2.078 3.687a1 1 0 0 0 .674.489l4.148.837a1 1 0 0 1 .539 1.657l-2.864 3.116a1 1 0 0 0-.258.791l.486 4.205a1 1 0 0 1-1.41 1.024l-3.848-1.762a1 1 0 0 0-.832 0l-3.849 1.762a1 1 0 0 1-1.41-1.024l.487-4.205a1 1 0 0 0-.257-.791L3.69 10.719a1 1 0 0 1 .539-1.657l4.148-.837a1 1 0 0 0 .674-.49z" />
  </Svg>
);
export default SvgStar;
