import { useCallback, useEffect, useState } from "react";

const useTimer = (delay: number) => {
  const [state, setState] = useState(0);
  const [stop, isSetStop] = useState(true);

  const toggle = useCallback(() => {
    isSetStop(!stop);
  }, [isSetStop, stop]);

  useEffect(() => {
    if (stop) return;
    setTimeout(() => {
      setState((prev) => prev + 1);
    }, delay);
  }, [state, stop]);

  return [state, toggle];
};

export default useTimer;
