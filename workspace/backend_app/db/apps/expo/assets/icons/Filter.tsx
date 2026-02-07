import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgFilter = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#000"
      d="M12 4a1 1 0 1 0 0 2zm8 2a1 1 0 1 0 0-2zm-8 12a1 1 0 1 0 0 2zm8 2a1 1 0 1 0 0-2zm-8-7a1 1 0 1 0 0-2zm-8-2a1 1 0 1 0 0 2zm8-5h8V4h-8zm0 14h8v-2h-8zm0-9H4v2h8zM3 5a3 3 0 0 0 3 3V6a1 1 0 0 1-1-1zm3 3a3 3 0 0 0 3-3H7a1 1 0 0 1-1 1zm3-3a3 3 0 0 0-3-3v2a1 1 0 0 1 1 1zM6 2a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1zM3 19a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1zm3 3a3 3 0 0 0 3-3H7a1 1 0 0 1-1 1zm3-3a3 3 0 0 0-3-3v2a1 1 0 0 1 1 1zm-3-3a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1zm15-4a3 3 0 0 0-3-3v2a1 1 0 0 1 1 1zm-3-3a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1zm-3 3a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1zm3 3a3 3 0 0 0 3-3h-2a1 1 0 0 1-1 1z"
    />
  </Svg>
);
export default SvgFilter;
