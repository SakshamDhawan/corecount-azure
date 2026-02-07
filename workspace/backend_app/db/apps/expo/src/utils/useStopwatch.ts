import { useCallback, useEffect, useRef, useState } from "react";

type StopwatchProps = [number, () => void, () => void];

const useStopwatch = (): StopwatchProps => {
  const [state, setState] = useState(0);
  const [isRunning, isSetisRunning] = useState(false);

  const currentFrame = useRef();
  const currentValue = useRef<number>(0);

  const toggle = useCallback(() => {
    isSetisRunning(!isRunning);
  }, [isSetisRunning, isRunning]);

  const reset = useCallback(() => {
    setState(0);
    isSetisRunning(false);
  }, []);

  const addTime = useCallback((time) => {
    currentValue.current += time;
    setState(currentValue.current);
  }, []);

  useEffect(() => {
    // if (isRunning) currentFrame.current = setInterval(() => addTime(100), 100);
    // else clearInterval(currentFrame.current);
  }, [isRunning]);

  return [state, reset, toggle];
};

export default useStopwatch;
