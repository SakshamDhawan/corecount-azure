import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgEdit = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="m18 10-4-4M2.5 21.5l3.384-.376c.414-.046.62-.069.814-.131a2 2 0 0 0 .485-.234c.17-.111.317-.259.61-.553L21 7a2.828 2.828 0 1 0-4-4L3.794 16.206c-.294.294-.442.442-.553.611a2 2 0 0 0-.233.485c-.063.193-.086.4-.132.814z" />
  </Svg>
);
export default SvgEdit;
