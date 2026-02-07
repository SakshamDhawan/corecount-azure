import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgFaq = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="M9.815 9.252a2.248 2.248 0 0 1 4.37.75c0 1.748-2.249 2.748-2.249 2.748m.03 3.5h.01M12 21a9 9 0 1 0-8.342-5.616c.081.2.122.3.14.381a1 1 0 0 1 .024.219c0 .083-.015.173-.045.353l-.593 3.558c-.062.373-.093.56-.035.694a.5.5 0 0 0 .262.262c.135.058.321.027.694-.035l3.558-.593c.18-.03.27-.045.353-.045.081 0 .14.006.219.024.08.018.18.059.38.14A9 9 0 0 0 12 21" />
  </Svg>
);
export default SvgFaq;
