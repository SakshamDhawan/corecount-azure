import React from "react";
import Svg, { Circle, Defs, G, Image, LinearGradient, Path, Stop } from "react-native-svg";

const ProgressBar = (props: { size: number; progress: number }) => {
  const center = props.size / 2;
  const val = props.progress / 100;

  const width = 182;
  const height = 154;

  return (
    <Svg width={width} height={height} viewBox="0 0 182 154" fill="none">
      <Defs>
        <LinearGradient id="Gradient1" r={2}>
          <Stop offset={0} stopColor={"red"} />
          <Stop offset={val} stopColor={"yellow"} />
          <Stop offset={val + 0.1} stopColor={"black"} />
          <Stop offset={1} stopColor={"black"} />
        </LinearGradient>
      </Defs>

      <Image
        scale={0.8}
        x={0.5 * center}
        y={0.5 * center}
        width={width}
        height={height}
        href={require("../../assets/dummy/profile.png")}
      />

      <Path
        d="M33.475 150.569c-3.142 3.253-8.359 3.366-11.317-.056A90.997 90.997 0 0140.193 15.504a91 91 0 01119.482 135.201c-2.967 3.414-8.184 3.286-11.317.024-3.133-3.263-2.988-8.421-.088-11.893A74.625 74.625 0 00132.835 29.21a74.62 74.62 0 00-99.238 109.466c2.89 3.48 3.02 8.639-.122 11.893z"
        fill="#152533"
      />
      <Path
        d="M33.475 150.569c-3.142 3.253-8.359 3.366-11.317-.056A90.997 90.997 0 0140.193 15.504a91 91 0 01119.482 135.201c-2.967 3.414-8.184 3.286-11.317.024-3.133-3.263-2.988-8.421-.088-11.893A74.625 74.625 0 00132.835 29.21a74.62 74.62 0 00-99.238 109.466c2.89 3.48 3.02 8.639-.122 11.893z"
        fill="url(#Gradient1)"
      />
      <G fill={"#fff"} x={50} y={20}>
        <Circle r={20}></Circle>
        <Path
          fill={"#f00"}
          x={-12}
          y={-10}
          d="M11.129 4.049a1 1 0 0 1 1.742 0l2.078 3.687a1 1 0 0 0 .674.489l4.148.837a1 1 0 0 1 .539 1.657l-2.864 3.116a1 1 0 0 0-.258.791l.486 4.205a1 1 0 0 1-1.41 1.024l-3.848-1.762a1 1 0 0 0-.832 0l-3.849 1.762a1 1 0 0 1-1.41-1.024l.487-4.205a1 1 0 0 0-.257-.791L3.69 10.719a1 1 0 0 1 .539-1.657l4.148-.837a1 1 0 0 0 .674-.49z"
        />
      </G>
    </Svg>
  );
};

export default ProgressBar;
