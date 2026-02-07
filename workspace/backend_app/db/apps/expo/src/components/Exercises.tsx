import * as React from "react";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { router } from "expo-router";
import queryString from "query-string";
import { Controller, useForm } from "react-hook-form";

import type { CompletedWorkoutWithPartialRelations } from "@corecount/dbprisma/zod";

import {
  difficultyOptions,
  repsOptions,
} from "~/app/(pages)/programmes/create";
import { ChevronRight } from "~/assets/icons";
import ExerciseCard from "~/components/ExerciseCard";
import StyledText from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import Card from "~/components/ui/Card";
import LabelBar from "~/components/ui/LabelBar";
import MySlider from "~/components/ui/Slider";
import useAuth from "~/context/useAuth";
import { api } from "~/context/useTRPC";
import { Picker } from "@react-native-picker/picker";
import { colors } from "@corecount/tailwind-config/constants";

export type CombinedWorkout = CompletedWorkoutWithPartialRelations & {
  duration: number;
  completions: number;
};

export const Exercises = () => {
  const { user } = useAuth();

  const [sorting, setSorting] = useState("completions");

  const [combinedWorkouts, setCombinedWorkouts] = useState<
    CombinedWorkout[] | undefined
  >(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    data: exercises,
    refetch,
    isRefetching,
  } = api.completedWorkouts.list.useQuery({
    where: { userId: user?.id },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      workout: true,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (exercises) {
      const combined: CombinedWorkout[] = Object.values(
        exercises.reduce((acc, workout) => {
          const workoutId: string = workout.workoutId;
          if (!acc[workoutId]) {
            acc[workoutId] = {
              ...workout,
              completions: 0,
            };
          }
          acc[workoutId].completions += 1;
          return acc;
        }, {}),
      );
      const combW = combined.sort((a, b) => a.completions - b.completions);
      setCombinedWorkouts(combW);
    }
  }, [exercises]);

  const { data: workouts } = api.workouts.list.useQuery({
    select: { title: true, id: true },
  });

  const onSubmit = (data: any) => {
    const q = queryString.stringify(data);
    console.log(q);
    setModalVisible(false);
    reset();
    // @ts-ignore
    router.push(`/freestyle/${data.workout.id}?${q}`);
  };

  function setNewSorting(itemValue) {
    setSorting(itemValue);
    switch (itemValue) {
      case "completions":
        combinedWorkouts.sort((a, b) => b.completions - a.completions);
        break;
      case "name":
        combinedWorkouts.sort((a, b) => {
          if (a.workout.title < b.workout.title) {
            return -1;
          }
          if (a.workout.title > b.workout.title) {
            return 1;
          }
          return 0;
        });
        break;
      case "points":
        combinedWorkouts.sort((a, b) => {
          return a.points - b.points;
        });
        break;
      case "activity":
        combinedWorkouts.sort((a, b) => a.updatedAt - b.updatedAt);
        break;
    }

    setCombinedWorkouts(combinedWorkouts);
  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className={"mx-8 mt-40 rounded-b-2xl"}>
          <View
            className={
              "flex h-20 items-center justify-center rounded-t-2xl bg-dark-70"
            }
          >
            <StyledText className={"text-center text-light-10"}>
              FREESTYLE
            </StyledText>
          </View>
          <View className={"rounded-b-2xl bg-dark-60"}>
            <View className={"m-8 flex gap-y-4"}>
              <LabelBar label={"Select difficulty"} />
              <Controller
                control={control}
                name={"difficulty"}
                defaultValue={1}
                render={({ field: { onChange, value } }) => (
                  <MySlider
                    trackMarks={difficultyOptions}
                    onValueChange={onChange}
                    value={Number(value)}
                    step={1}
                    minimumValue={1}
                    maximumValue={3}
                    animationType={"spring"}
                  />
                )}
              />

              {errors.difficulty && (
                <StyledText className={"text-red"}>
                  This is required.
                </StyledText>
              )}

              <LabelBar label={"Select number of reps"} />
              <Controller
                control={control}
                name={"reps"}
                defaultValue={6}
                render={({ field: { onChange, value } }) => (
                  <MySlider
                    trackMarks={repsOptions}
                    onValueChange={onChange}
                    value={Number(value)}
                    step={2}
                    minimumValue={6}
                    maximumValue={12}
                    animationType={"spring"}
                  />
                )}
              />
              {errors.reps && (
                <StyledText className={"text-red"}>
                  This is required.
                </StyledText>
              )}

              <View>
                <Controller
                  control={control}
                  defaultValue={null}
                  name={"workout"}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <>
                      <LabelBar label={"Select an exercise"} />
                      <View
                        className={
                          "flex flex-row items-center rounded-md border px-5 py-5"
                        }
                        style={{ borderColor: "rgba(255,255,255,0.3)" }}
                      >
                        {workouts && (
                          <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value) => onChange(value)}
                            items={workouts.map((workout) => {
                              return { label: workout.title, value: workout };
                            })}
                          />
                        )}
                      </View>
                    </>
                  )}
                />
              </View>
              {errors.workout && (
                <StyledText className={"text-red"}>
                  This is required.
                </StyledText>
              )}
            </View>
            <View className={"mx-8 flex flex-row gap-2 p-4"}>
              <Button
                onPress={() => setModalVisible(false)}
                className={"flex-1"}
              >
                CANCEL
              </Button>
              <Button onPress={handleSubmit(onSubmit)} className={"flex-1"}>
                ADD
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Card className={"flex flex-row"}>
          <StyledText className={"flex-grow text-2xl font-bold"}>
            Freestyle
          </StyledText>
          <ChevronRight width={24} height={24} stroke="#fff" />
        </Card>
      </Pressable>

      <View>
        <LabelBar label={"Sort by"} />
        <Picker
          style={{ color: colors.light["10"] }}
          dropdownIconColor={colors.light["10"]}
          selectedValue={sorting}
          onValueChange={(itemValue, itemIndex) => setNewSorting(itemValue)}
        >
          <Picker.Item label="Completions" value="completions" />
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Points" value="points" />
          <Picker.Item label="Activity" value="activity" />
        </Picker>
      </View>

      <FlatList
        data={combinedWorkouts}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => {}}>
            <ExerciseCard key={item.id} workout={item} />
          </TouchableWithoutFeedback>
        )}
        onRefresh={refetch}
        refreshing={isRefetching}
        ItemSeparatorComponent={() => <View className={"h-4"} />}
      />
    </>
  );
};

export default Exercises;
