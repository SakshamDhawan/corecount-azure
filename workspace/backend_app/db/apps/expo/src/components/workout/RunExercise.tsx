import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Animated from "react-native-reanimated";
import { useKeepAwake } from "expo-keep-awake";
import { router } from "expo-router";
import { Audio } from "expo-av";
import { clsx } from "clsx";
import type { SensorsType, Workout } from "@corecount/dbprisma/zod";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Chart, ChevronLeft, ChevronRight, Line } from "~/assets/icons";

import AnimatedSensorBar from "~/components/AnimatedSensorBar";
import StyledText, { typography } from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import Button from "~/components/ui/Button";
import Card from "~/components/ui/Card";
import IconButton from "~/components/ui/IconButton";
import { AnimatedRepsBlock } from "~/components/workout/RepsBlocks";
import { api } from "~/context/useTRPC";
import useWearable from "~/context/useWearable";
import type { StartWorkoutProps } from "~/components/workout/screens/StartExercise";
import { useStopwatch } from "react-use-precision-timer";
import AnimatedSensorGraph from "~/components/AnimatedSensorGraph";

const getDuration = (strength: number, workout: Workout | undefined) => {
  switch (strength) {
    case 1:
      return workout?.hold_1 ?? 0;
    case 2:
      return workout?.hold_2 ?? 0;
    case 3:
      return workout?.hold_3 ?? 0;
    default:
      return 0;
  }
};

enum WorkoutPhase {
  "PRE",
  "CONTRACT",
  "REST",
}

enum ViewingMode {
  "BAR",
  "GRAPH",
}

const RunExercise = ({ ...props }: StartWorkoutProps) => {
  // const [lsound, setSound] = useState<Sound>();

  const [viewingMode, setViewingMode] = useState<ViewingMode>(ViewingMode.BAR);

  const { id } = props;
  const [active, setActive] = useState(false);
  const phase = useRef(WorkoutPhase.PRE);
  const [currentReps, setCurrentReps] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const { data: workout, isFetched } = api.workouts.byId.useQuery({ id });
  const [totalReps, setTotalReps] = useState(props.reps);
  const { notify, stopNotify } = useWearable();
  const targetSensors = useRef({
    IMU: false,
    Spinal: false,
    Transversus: false,
    Rectus: false,
  });
  const animationFrame = useRef<number>(-1);

  const stopwatch = useStopwatch();
  const stopwatchTotal = useStopwatch();
  const pointGetter = useRef(false);

  const intervalTimer = useRef();

  const [countdownValue, setCountdownValue] = useState(-1);
  const [totalCountdown, setTotalCountdown] = useState(0);

  const startCountdown = useCallback(
    (value: number) => {
      setTotalCountdown(value);
      setCountdownValue(value);
      clearInterval(intervalTimer.current);
      // @ts-ignore
      intervalTimer.current = setInterval(() => {
        setCountdownValue((prevState) => prevState - 1);
      }, 1000);
    },
    [setCountdownValue],
  );

  useEffect(() => {
    if (countdownValue === 0) {
      onCountdownFinished();
    }
  }, [countdownValue]);

  useKeepAwake();

  async function playPoints() {
    const { sound } = await Audio.Sound.createAsync(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require(`../../../assets/audio/points.mp3`),
    );
    // setSound(sound);
    await sound.playAsync();
  }

  async function playRest() {
    const { sound } = await Audio.Sound.createAsync(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require(`../../../assets/audio/rest.mp3`),
    );
    // setSound(sound);
    await sound.playAsync();
  }

  async function playContract() {
    const { sound } = await Audio.Sound.createAsync(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require(`../../../assets/audio/contract.mp3`),
    );
    // setSound(sound);
    await sound.playAsync();
  }

  const onCountdownFinished = useCallback(() => {
    if (phase.current === WorkoutPhase.CONTRACT) {
      setCurrentReps((prev) => prev + 1);
      phase.current = WorkoutPhase.REST;
      void playRest();
    } else {
      phase.current = WorkoutPhase.CONTRACT;

      void playContract();
    }

    stopwatch.stop();

    startCountdown(
      phase.current === WorkoutPhase.REST
        ? 5
        : getDuration(props.strength, workout),
    );

    checkTargets();
    stopwatch.start();
    checkTargets();
  }, [phase, startCountdown]);

  function getPoints(strength: number) {
    switch (strength) {
      case 1:
        return 2;
      case 2:
        return 5;
      case 3:
        return 10;
    }
    return 0;
  }

  const assignPoints = useCallback(() => {
    if (
      stopwatch.isRunning() &&
      stopwatch.getElapsedRunningTime() > 2000 &&
      pointGetter.current
    ) {
      playPoints();
      if (phase.current === WorkoutPhase.CONTRACT) {
        setCurrentPoints((prev) => prev + getPoints(props.strength));
      } else {
        setCurrentPoints((prev) => prev + 2);
      }
      stopwatch.stop();
      stopwatch.start();
    }
  }, []);

  const handleFrame = (_timestamp: number) => {
    assignPoints();

    animationFrame.current = requestAnimationFrame(handleFrame);
  };

  function InitializeValues() {
    // Get reps and total duration
    if (workout) {
      setTotalReps(props.completedProgramme?.reps ?? 0);
      phase.current = WorkoutPhase.CONTRACT;
      setCurrentReps(0);
      setCurrentPoints(0);
    }
  }

  useEffect(() => {
    notify();

    InitializeValues();

    return () => {
      stopNotify();
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  function onStartWorkout(): void {
    setActive(true);
    stopwatchTotal.start();
    animationFrame.current = requestAnimationFrame(handleFrame);

    startCountdown(getDuration(props.strength, workout));

    checkTargets();
    stopwatch.start();
    checkTargets();
  }

  useEffect(() => {
    if (currentReps === totalReps) {
      const duration = stopwatchTotal.getElapsedRunningTime();
      console.log("Duration", duration);
      props.onCompleted({
        points: currentPoints,
        duration: duration,
      });
    }
  }, [currentReps, currentPoints]);

  function getSensorTarget(sensor: SensorsType) {
    switch (sensor) {
      case "IMU":
        return 50;
      case "Spinal":
      case "Transversus":
      case "Rectus":
        switch (props.strength) {
          case 1:
            return 20;
          case 2:
            return 30;
          case 3:
            return 40;
        }
        return 0;
    }
  }

  function checkTargets() {
    if (workout === undefined) return;
    if (phase.current === WorkoutPhase.CONTRACT) {
      let meow = true;
      for (const sensor of workout.sensors) {
        if (!targetSensors.current[sensor]) {
          meow = false;
        }
      }
      pointGetter.current = meow;
      if (meow) stopwatch.resume();
      else stopwatch.pause();
    } else if (phase.current === WorkoutPhase.REST) {
      let meow = false;
      for (const sensor of workout.sensors) {
        if (targetSensors.current[sensor]) {
          meow = true;
        }
      }
      pointGetter.current = !meow;
      if (!meow) stopwatch.resume();
      else stopwatch.pause();
    }
  }

  function onSensorTargetChange(sensor: SensorsType, above: boolean) {
    targetSensors.current[sensor] = above;

    checkTargets();
  }

  function getStrengthText(strength: number) {
    switch (strength) {
      case 1:
        return "LOW";
      case 2:
        return "MEDIUM";
      case 3:
        return "HIGH";
    }
  }

  function switchView() {
    if (viewingMode === ViewingMode.BAR) {
      setViewingMode(ViewingMode.GRAPH);
    } else {
      setViewingMode(ViewingMode.BAR);
    }
  }

  return (
    <ScrollView>
      <TitleBar
        iconLeft={
          <IconButton
            shape={"circle"}
            onPress={() => router.back()}
            size={"small"}
            icon={ChevronLeft}
          />
        }
        iconRight={
          <IconButton
            shape={"circle"}
            onPress={() => switchView()}
            size={"small"}
            icon={viewingMode === ViewingMode.BAR ? Chart : Line}
          />
        }
      />

      {isFetched && workout && (
        <Card className={"flex max-h-full gap-y-5 bg-dark-70 "}>
          <StyledText className={"text-white"} style={typography.h1}>
            {workout.title}
          </StyledText>
          <Animated.View>
            <StyledText style={typography.h2} className={"text-white"}>
              {currentPoints}{" "}
              <StyledText className={"text-dark-40"}>points</StyledText>{" "}
            </StyledText>
          </Animated.View>

          <Animated.View>
            <View className={"flex flex-row justify-between"}>
              <StyledText>
                Strength{" "}
                <StyledText className={"text-dark-40"}>
                  {getStrengthText(props.strength)}
                </StyledText>{" "}
              </StyledText>
              <StyledText>
                <StyledText>
                  {currentReps}/{totalReps}
                </StyledText>{" "}
                REPS
              </StyledText>
            </View>

            <AnimatedRepsBlock current={currentReps} total={totalReps} />
          </Animated.View>

          <View className={clsx(ViewingMode.GRAPH === viewingMode && "hidden")}>
            {workout.sensors.map((sensor, idx) => (
              <AnimatedSensorBar
                idx={idx}
                sensor={sensor}
                target={getSensorTarget(sensor)}
                strength={props.strength}
                updateState={(above) => onSensorTargetChange(sensor, above)}
              />
            ))}
          </View>

          <View className={clsx(ViewingMode.BAR === viewingMode && "hidden")}>
            {workout.sensors.map((sensor, idx) => (
              <AnimatedSensorGraph
                idx={idx}
                sensor={sensor}
                phase={phase.current}
                countdownValue={countdownValue}
                target={getSensorTarget(sensor)}
                strength={props.strength}
                updateState={(above) => onSensorTargetChange(sensor, above)}
              />
            ))}
          </View>
          <View className={"flex grow"}></View>

          <View className={"gap-y-2 bg-dark-60 "}>
            {active ? (
              <>
                <View
                  className={
                    "h-32 items-center justify-center rounded border border-green bg-green text-black"
                  }
                >
                  <StyledText
                    className={"text-black"}
                    style={typography.bigNumber}
                  >
                    {WorkoutPhase[phase.current]}
                  </StyledText>
                </View>

                <View style={{ backgroundColor: "#ddd", height: 20 }}>
                  <View
                    style={{
                      width: `${(countdownValue / totalCountdown) * 100}%`,
                      height: "100%",
                      backgroundColor: "#0070f3",
                    }}
                  />
                </View>

                {/*<Button*/}
                {/*  onPress={() => {*/}
                {/*    */}
                {/*  }}*/}
                {/*>*/}
                {/*  PAUSE | RESUME*/}
                {/*</Button>*/}
                <Button
                  onPress={() => {
                    setCurrentReps((prevState) => prevState + 1);
                  }}
                >
                  AddRep{" "}
                </Button>
              </>
            ) : (
              <>
                <View
                  className={
                    "h-32 items-center justify-center rounded border border-green bg-dark-90"
                  }
                >
                  <StyledText>Press start to begin workout</StyledText>
                </View>
                <Button onPress={onStartWorkout}>START</Button>
              </>
            )}
          </View>
        </Card>
      )}
    </ScrollView>
  );
};

export default RunExercise;
