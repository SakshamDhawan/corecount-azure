import * as React from "react";
import { Text, View } from "react-native";

import type { DifficultyType, Workout, WorkoutsOnProgrammes } from "@corecount/dbprisma/zod";

interface SelectedWorkoutType extends WorkoutsOnProgrammes {
  workout: Workout;
  intensity: DifficultyType;
}

const SelectedWorkout = ({ ...props }: SelectedWorkoutType) => {
  return (
    <View>
      <Text>{props.workout.title}</Text>
    </View>
  );
};

export default SelectedWorkout;
