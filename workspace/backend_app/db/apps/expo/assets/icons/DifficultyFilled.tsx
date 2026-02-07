// @ts-nocheck

/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Defs, G, LinearGradient, Path, Stop } from "react-native-svg";

const SvgDifficultyFilled = (props: SvgProps) => (
  <Svg width={35} height={36} fill="none" {...props}>
    <G filter="url(#difficulty-filled_svg__a)">
      <Path
        fill="#FFAE21"
        fillRule="evenodd"
        d="M18.333 6.313a.78.78 0 0 0-1.11-.141 10.1 10.1 0 0 0-3.671 6.407 7.8 7.8 0 0 1-1.769-1.78.78.78 0 0 0-1.195-.086 9.336 9.336 0 1 0 10.564-2.068 7.74 7.74 0 0 1-2.819-2.332m2.891 12.41a3.89 3.89 0 1 1-7.585-1.216c.651.483 1.4.84 2.212 1.038.22-1.42.926-2.72 1.997-3.678a3.89 3.89 0 0 1 3.376 3.856"
        clipRule="evenodd"
      />
      <Path
        fill="url(#difficulty-filled_svg__b)"
        fillOpacity={0.8}
        fillRule="evenodd"
        d="M18.333 6.313a.78.78 0 0 0-1.11-.141 10.1 10.1 0 0 0-3.671 6.407 7.8 7.8 0 0 1-1.769-1.78.78.78 0 0 0-1.195-.086 9.336 9.336 0 1 0 10.564-2.068 7.74 7.74 0 0 1-2.819-2.332m2.891 12.41a3.89 3.89 0 1 1-7.585-1.216c.651.483 1.4.84 2.212 1.038.22-1.42.926-2.72 1.997-3.678a3.89 3.89 0 0 1 3.376 3.856"
        clipRule="evenodd"
      />
      <Path
        stroke="#fff"
        strokeOpacity={0.32}
        strokeWidth={0.75}
        d="M17.457 6.464a9.73 9.73 0 0 0-3.535 6.17l-.09.612-.5-.363a8.2 8.2 0 0 1-1.854-1.867.4.4 0 0 0-.473-.141l-.135-.35.135.35a.4.4 0 0 0-.146.097 8.96 8.96 0 1 0 10.14-1.985l-.011-.005a8.1 8.1 0 0 1-2.955-2.445m-.576-.073.876-.151m-.876.151a.4.4 0 0 1 .456-.034l.189-.324m-.645.358.645-.358m-.07.431.301-.224m-.3.224.3-.224m-.3.224a.4.4 0 0 0-.12-.107l.189-.324m.231.207a.8.8 0 0 0-.231-.207m3.497 12.617a4.264 4.264 0 0 0-3.701-4.227l-.171-.023-.13.115a6.6 6.6 0 0 0-2.039 3.486 5.8 5.8 0 0 1-1.696-.868l-.418-.31-.162.494a4.266 4.266 0 1 0 8.317 1.333Z"
        style={{
          mixBlendMode: "overlay",
        }}
      />
    </G>
    <Defs>
      <LinearGradient
        id="difficulty-filled_svg__b"
        x1={17}
        x2={16.518}
        y1={26.5}
        y2={5.511}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.154} stopColor="#FF4F4F" />
        <Stop offset={0.758} stopColor="#FF4F4F" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgDifficultyFilled;
