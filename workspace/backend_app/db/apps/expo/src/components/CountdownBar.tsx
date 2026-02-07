import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { View } from "react-native";

import StyledText from "./styled/StyledText";

export interface CountdownBarProps {
  time: number;
  onFinish: () => void;
}

const CountdownBar = forwardRef(({ ...props }: CountdownBarProps, ref) => {
  const [timeLeft, setTimeLeft] = useState(props.time);

  useEffect(() => {
    if (!timeLeft) {
      props.onFinish();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const progress = (30 - timeLeft) / 30;

  return (
    <View>
      <View style={{ backgroundColor: "#ddd", height: 20 }}>
        <View
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: "#0070f3",
          }}
        />
      </View>
    </View>
  );
});

export default CountdownBar;
