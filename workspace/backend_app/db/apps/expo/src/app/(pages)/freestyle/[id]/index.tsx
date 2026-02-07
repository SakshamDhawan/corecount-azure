import type { ComponentProps } from "react";
import type { View } from "react-native";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

import StartExercise from "~/components/workout/screens/StartExercise";

type WorkoutProps = ComponentProps<typeof View> & {};

const FreestyleLayout = ({ ...props }: WorkoutProps) => {
  const local = useLocalSearchParams();

  const { difficulty, id, level, reps } = local;

  function onCompleted(result: any): void {
    console.log(result);
    router.push("/exercise");
  }

  return <StartExercise id={id} duration={Number(difficulty)} repetitions={Number(reps)} onCompleted={onCompleted} />;
};
export default FreestyleLayout;
