import type { ComponentProps } from "react";
import type { View } from "react-native";
import React, { useState } from "react";

import type { CompletedProgramme, Programme } from "@corecount/dbprisma/zod";

import PageLayout from "~/components/ui/PageLayout";
import RunExercise from "~/components/workout/RunExercise";
import BriefingExercise from "~/components/workout/screens/Briefing";
import { WearableProvider } from "~/context/useWearable";
import { api } from "~/context/useTRPC";
import useAuth from "~/context/useAuth";

interface WorkoutResults {
  points: number;
  duration: number;
}

export type StartWorkoutProps = ComponentProps<typeof View> & {
  id: string;
  strength: number;
  reps: number;
  onCompleted: (result: WorkoutResults) => void;
  completedProgramme?: CompletedProgramme;
  programme?: Programme;
  currentWorkout?: number;
  totalWorkouts?: number;
};

enum WorkoutPhase {
  BRIEFING,
  WORKOUT,
}

const StartExercise = ({ ...props }: StartWorkoutProps) => {
  const [phase, setPhase] = useState<WorkoutPhase>(WorkoutPhase.BRIEFING);

  const completedWorkoutMutation = api.completedWorkouts.add.useMutation();
  const { user } = useAuth();

  const onCompleted = (data: WorkoutResults) => {
    // Store workout data/points
    const workoutData = {
      user: { connect: { id: user?.id } },
      workout: { connect: { id: props.id } },
      points: data.points,
      duration: data.duration,
      completedProgramme: props.completedProgramme
        ? { connect: { id: props.completedProgramme.id } }
        : undefined,
    };

    completedWorkoutMutation.mutate(workoutData);

    props.onCompleted(data);
  };

  return (
    <WearableProvider>
      {phase === WorkoutPhase.BRIEFING && (
        <BriefingExercise
          onStart={() => setPhase(WorkoutPhase.WORKOUT)}
          {...props}
        />
      )}

      {phase === WorkoutPhase.WORKOUT && (
        <RunExercise {...props} onCompleted={onCompleted} />
      )}

      {/*{phase === WorkoutPhase.FEEDBACK && <WorkoutFeedback {...props} onCompleted={onContinue} />}*/}
    </WearableProvider>
  );
};

export default StartExercise;
