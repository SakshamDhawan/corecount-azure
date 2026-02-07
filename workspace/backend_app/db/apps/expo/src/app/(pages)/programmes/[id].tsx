import * as React from "react";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import type {
  CompletedProgramme,
  Programme,
  Workout,
} from "@corecount/dbprisma/zod";

import LinProgressBar from "~/components/LinProgressBar";
import StyledText, { typography } from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import PageLayout from "~/components/ui/PageLayout";
import StartExercise from "~/components/workout/screens/StartExercise";
import useAuth from "~/context/useAuth";
import { api } from "~/context/useTRPC";
import {
  Clock,
  DifficultyBase,
  FaceBad,
  FaceGood,
  FaceNeutral,
  FaceVBad,
  FaceVGood,
  Star,
} from "~/assets/icons";
import { colors } from "@corecount/tailwind-config/constants";
import Input from "~/components/ui/Input";
import type { ProgrammeFeedbackType } from "@corecount/dbprisma/schemas";
import { ProgrammeFeedbackSchema } from "@corecount/dbprisma/schemas";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toMinutesSecondsTimer } from "~/utils/timeCalc";

enum ProgramPhase {
  WORKOUT,
  BREAK,
  FINISHED,
}

const BreakLayout = ({ ...props }) => {
  return (
    <View className={"mt-20"}>
      <View className={"flex items-center"}>
        <StyledText>
          Please rest for 30 seconds or press skip to continue
        </StyledText>
        <LinProgressBar onFinished={() => props.onCompleted(null)} />
      </View>
      <Button onPress={() => props.onCompleted(null)}>Skip</Button>
      <View className={"flex items-center p-4"}>
        <StyledText style={typography.h2}>Skipping rest?</StyledText>
        <StyledText>
          Rest periods helps your body recover and reduce soreness. We recommend
          waiting to get the full benefit of your workout!
        </StyledText>
      </View>
      <View className={"flex items-center p-4"}>
        <StyledText style={typography.h2}>Next exercise</StyledText>
        <StyledText style={typography.h3}>
          {props.workouts[props.currentWorkout + 1].workout.title}
        </StyledText>
      </View>
    </View>
  );
};

export type ProgrammeFeedbackProps = ComponentProps<typeof View> & {
  completedProgramme?: CompletedProgramme;
  programme?: Programme;
  onCompleted: () => void;
};

const SessionFeedback = ({ ...props }: ProgrammeFeedbackProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProgrammeFeedbackType>({
    resolver: zodResolver(ProgrammeFeedbackSchema),
  });
  const completedProgrammeMutation = api.completedProgrammes.edit.useMutation();

  const completedWorkouts = api.completedWorkouts.list.useQuery({
    where: {
      completedProgrammeId: props.completedProgramme.id,
    },
  });

  const onSubmit: SubmitHandler<ProgrammeFeedbackType> = (data) => {
    completedProgrammeMutation.mutate({
      where: { id: props.completedProgramme.id },
      data,
    });

    props.onCompleted();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StyledText className={"text-center"} style={typography.h2}>
        Good session!
      </StyledText>
      <StyledText className={"text-center"} style={typography.body.small}>
        {props.completedProgramme.updatedAt.toLocaleDateString()} -{" "}
        {props.completedProgramme.updatedAt.toLocaleTimeString()}
      </StyledText>

      <View className={"flex flex-row justify-around"}>
        <View>
          <View
            className={
              "size-16 items-center justify-center rounded-full bg-dark-60"
            }
          >
            <Clock stroke={"#A16EFF"} />
          </View>
          {completedWorkouts.isFetched && (
            <StyledText className={"text-purple text-center"}>
              {toMinutesSecondsTimer(
                completedWorkouts.data.reduce((a, b) => a + b.duration, 0) /
                  1000,
              )}
            </StyledText>
          )}
          <StyledText className={"text-center"}>Duration</StyledText>
        </View>
        {/*<View>*/}
        {/*  <View*/}
        {/*    className={*/}
        {/*      "size-16 items-center justify-center rounded-full bg-dark-60"*/}
        {/*    }*/}
        {/*  >*/}
        {/*    <Star stroke={colors.purple} />*/}
        {/*  </View>*/}
        {/*  <StyledText className={"text-yellow-400"} style={typography.h1}>*/}
        {/*    GOLD*/}
        {/*  </StyledText>*/}
        {/*  <StyledText>Duration</StyledText>*/}
        {/*</View>*/}
        <View>
          <View
            className={
              "size-16 items-center justify-center rounded-full bg-dark-60"
            }
          >
            <DifficultyBase stroke={colors.teal} />
          </View>
          <StyledText className={"text-teal text-center"}>
            {completedWorkouts.isFetched && (
              <StyledText className={"text-teal"}>
                {completedWorkouts.data.reduce((a, b) => a + b.points, 0)}
              </StyledText>
            )}
          </StyledText>
          <StyledText className={"text-center"}>Points</StyledText>
        </View>
      </View>

      <View className={"flex flex-col gap-8"}>
        <StyledText style={typography.h2}>How was your workout?</StyledText>

        <Controller
          control={control}
          defaultValue={3}
          name={"rating"}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View className={"flex flex-row justify-around"}>
                <View
                  className={"h-8 w-8 items-center justify-center rounded-full"}
                  style={{
                    backgroundColor:
                      value === 1 ? colors.green : colors.dark["80"],
                  }}
                >
                  <FaceVBad
                    onPress={() => onChange(1)}
                    stroke={
                      value === 1 ? colors.dark["90"] : colors.light["80"]
                    }
                    width={24}
                    height={24}
                  />
                </View>
                <View
                  className={"h-8 w-8 items-center justify-center rounded-full"}
                  style={{
                    backgroundColor:
                      value === 2 ? colors.green : colors.dark["80"],
                  }}
                >
                  <FaceBad
                    onPress={() => onChange(2)}
                    stroke={
                      value === 2 ? colors.dark["90"] : colors.light["80"]
                    }
                    width={24}
                    height={24}
                  />
                </View>
                <View
                  className={"h-8 w-8 items-center justify-center rounded-full"}
                  style={{
                    backgroundColor:
                      value === 3 ? colors.green : colors.dark["80"],
                  }}
                >
                  <FaceNeutral
                    onPress={() => onChange(3)}
                    stroke={
                      value === 3 ? colors.dark["90"] : colors.light["80"]
                    }
                    width={24}
                    height={24}
                  />
                </View>
                <View
                  className={"h-8 w-8 items-center justify-center rounded-full"}
                  style={{
                    backgroundColor:
                      value === 4 ? colors.green : colors.dark["80"],
                  }}
                >
                  <FaceGood
                    onPress={() => onChange(4)}
                    stroke={
                      value === 4 ? colors.dark["90"] : colors.light["80"]
                    }
                    width={24}
                    height={24}
                  />
                </View>
                <View
                  className={"h-8 w-8 items-center justify-center rounded-full"}
                  style={{
                    backgroundColor:
                      value === 5 ? colors.green : colors.dark["80"],
                  }}
                >
                  <FaceVGood
                    onPress={() => onChange(5)}
                    stroke={
                      value === 5 ? colors.dark["90"] : colors.light["80"]
                    }
                    width={24}
                    height={24}
                  />
                </View>
              </View>
            </>
          )}
        />
        {errors.rating && (
          <StyledText className={"text-red"}>
            {errors.rating.message}
          </StyledText>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              multiline={true}
              numberOfLines={5}
              placeholder="Leave a comment about your workout…"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="comments"
        />
      </View>
      {errors.comments && (
        <StyledText className={"text-red"}>
          {errors.comments.message}
        </StyledText>
      )}

      {/*<StyledText>{JSON.stringify(errors)}</StyledText>*/}

      <View className={"grow mb-4"}></View>
      <View className={"mb-4"}>
        <Button onPress={handleSubmit(onSubmit)}>Continue</Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const RunProgram = () => {
  const localSearchParams = useLocalSearchParams();
  const [currentExerciseNumber, setCurrentExerciseNumber] = useState<number>(0);
  const reps = Number(localSearchParams.reps);
  const strength = Number(localSearchParams.difficulty);
  const [currentWorkout, setCurrentWorkout] = useState<string | undefined>(
    undefined,
  );
  const { user } = useAuth();
  const [initialized, setInitialized] = useState(false);
  const [completedProgramme, setCompletedProgramme] = useState<
    CompletedProgramme | undefined
  >(undefined);
  const [workouts, setWorkouts] = useState<Workout[] | undefined>();

  const [phase, setPhase] = useState<ProgramPhase>(ProgramPhase.WORKOUT);

  const { data: programme, isFetched } = api.programmes.byId.useQuery({
    where: { id: localSearchParams.id },
    include: {
      workouts: {
        include: {
          workout: true,
        },
      },
    },
  });

  const addCompletedProgrammeMutation =
    api.completedProgrammes.add.useMutation();
  const editProgrammeMutation = api.completedProgrammes.edit.useMutation();

  useEffect(() => {
    if (programme) {
      const sortedWorkouts = programme.workouts
        ?.sort((a, b) => a.order - b.order)
        .map((workout) => workout.workout);

      setWorkouts(sortedWorkouts);
      // //
      // //
      const currentWork = sortedWorkouts[currentExerciseNumber];
      setCurrentWorkout(currentWork.id);
      //
      addCompletedProgrammeMutation
        .mutateAsync({
          programme: { connect: { id: programme.id } },
          user: { connect: { id: user?.id } },
          completed: false,
          strength: strength,
          reps: reps,
        })
        .then((programme) => {
          setCompletedProgramme(programme);
        })
        .catch(console.error)
        .finally(() => setInitialized(true));
    }
  }, [programme]);

  function onCompleted(result: any) {
    // Finish the workout
    if (phase === ProgramPhase.WORKOUT) {
      console.log(
        "We have completed the workout! Yaaay! Move on to the next one",
      );

      // Are we done with the programme?
      if (currentExerciseNumber === programme.workouts.length - 1) {
        editProgrammeMutation
          .mutateAsync({
            where: {
              id: completedProgramme?.id,
            },
            data: {
              completed: true,
            },
          })
          .then((programme) => {
            setPhase(ProgramPhase.FINISHED);
          });
      } else {
        setPhase(ProgramPhase.BREAK);
      }
    }

    // Go to the next workout
    if (phase === ProgramPhase.BREAK) {
      const currentWork = workouts[currentExerciseNumber + 1];

      setCurrentWorkout(currentWork.id);
      setCurrentExerciseNumber(currentExerciseNumber + 1);
      setPhase(ProgramPhase.WORKOUT);
    }
  }

  function finishProgramme() {
    router.push(`/progress`);
  }

  return (
    <>
      {initialized && (
        <>
          {phase === ProgramPhase.WORKOUT && currentWorkout && (
            <StartExercise
              id={currentWorkout}
              strength={strength}
              programme={programme}
              completedProgramme={completedProgramme}
              reps={reps}
              onCompleted={onCompleted}
              currentWorkout={currentExerciseNumber}
              totalWorkouts={programme.workouts.length}
            />
          )}
          {phase === ProgramPhase.BREAK && (
            <BreakLayout
              workouts={programme.workouts}
              currentWorkout={currentExerciseNumber}
              onCompleted={() => onCompleted(null)}
            />
          )}
          {phase === ProgramPhase.FINISHED && (
            <SessionFeedback
              programme={programme}
              completedProgramme={completedProgramme}
              onCompleted={() => finishProgramme()}
            />
          )}
        </>
      )}
    </>
  );
};

export default RunProgram;
