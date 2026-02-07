import { useCallback, useEffect, useState } from "react";

const useCountdown = () => {
  const [state, setState] = useState(10);
  const [stop, isSetStop] = useState(true);

  const set = useCallback(
    (value: number) => {
      setState(value);
      isSetStop(true);
    },
    [isSetStop, setState],
  );

  const toggle = useCallback(() => {
    isSetStop(!stop);
  }, [isSetStop, stop]);

  useEffect(() => {
    if (stop) return;

    setTimeout(() => {
      setState((prev) => prev - 1);
    }, 1000);
  }, [state, stop]);

  return [state, set, toggle];
};

export default useCountdown;
