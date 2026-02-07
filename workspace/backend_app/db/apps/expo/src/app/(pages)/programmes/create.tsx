import * as React from "react";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { ChevronLeft, Notification, PlusCircle } from "~/assets/icons";
import AddWorkoutModal from "~/components/AddWorkoutModal";
import { IntensityProfiles } from "~/components/Intensity";
import StyledText from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import Button from "~/components/ui/Button";
import Card from "~/components/ui/Card";
import IconButton from "~/components/ui/IconButton";
import Input from "~/components/ui/Input";
import { api } from "~/context/useTRPC";

export const difficultyOptions = [1, 2, 3];
export const repsOptions = [6, 8, 10, 12];

const CreateProgramme = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      workouts: [],
      intensity: IntensityProfiles[0]?.intensity,
      difficulty: 1,
      reps: 6,
    },
  });

  const addProgramme = api.programmes.add.useMutation();
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = (data: unknown) => {
    let order: 1;
    data = {
      name: data.name,
      workouts: {
        create: data.workouts.map((workout) => ({
          workout: { order: order++, connect: { id: workout.workout.id } },
        })),
      },
    };

    console.log(JSON.stringify(data));

    addProgramme.mutateAsync(data).finally(() => router.push("/exercise"));
  };

  function addWorkout(data) {
    const currentValues = getValues("workouts");
    currentValues.push(data);
    setValue("workouts", currentValues);
    setModalVisible(false);
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
        <AddWorkoutModal addWorkout={addWorkout} cancel={() => setModalVisible(false)} />
      </Modal>

      <View style={{ opacity: modalVisible ? 0.2 : undefined }} className={"p-4"}>
        <TitleBar
          iconLeft={<IconButton icon={ChevronLeft} shape={"circle"} size={"small"} onPress={() => router.back()} />}
        >
          CREATE PROGRAMME
        </TitleBar>

        <View className={"flex flex-col justify-items-end gap-2"}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={"PROGRAMME NAME"}
                icon={Notification}
                placeholder="Enter a name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {errors.name && <StyledText className={"text-red"}>This is required.</StyledText>}

          {/*<LabelBar label={"Select difficulty"} />*/}
          {/*<Controller*/}
          {/*  control={control}*/}
          {/*  name={"difficulty"}*/}
          {/*  defaultValue={1}*/}
          {/*  render={({ field: { onChange, value } }) => (*/}
          {/*    <MySlider*/}
          {/*      trackMarks={difficultyOptions}*/}
          {/*      onValueChange={onChange}*/}
          {/*      value={Number(value)}*/}
          {/*      step={1}*/}
          {/*      minimumValue={1}*/}
          {/*      maximumValue={3}*/}
          {/*      animationType={"spring"}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*/>*/}

          {/*<LabelBar label={"Select number of reps"} />*/}
          {/*<Controller*/}
          {/*  control={control}*/}
          {/*  name={"reps"}*/}
          {/*  defaultValue={6}*/}
          {/*  render={({ field: { onChange, value } }) => (*/}
          {/*    <MySlider*/}
          {/*      trackMarks={repsOptions}*/}
          {/*      onValueChange={onChange}*/}
          {/*      value={Number(value)}*/}
          {/*      step={2}*/}
          {/*      minimumValue={6}*/}
          {/*      maximumValue={12}*/}
          {/*      animationType={"spring"}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*/>*/}

          {/*<LabelBar label={"Select an intensity"} />*/}

          {/*<Controller*/}
          {/*  control={control}*/}
          {/*  name={"intensity"}*/}
          {/*  render={({ field: { onChange, value } }) => (*/}
          {/*    <View style={{ borderColor: "rgba(255,255,255,0.25)" }} className={"rounded-xl border"}>*/}
          {/*      {IntensityProfiles.map((intensity) => (*/}
          {/*        <Pressable*/}
          {/*          onPress={() => onChange(intensity.intensity)}*/}
          {/*          style={{*/}
          {/*            backgroundColor: intensity.intensity === value ? "#1B3042" : "#0D1623",*/}
          {/*          }}*/}
          {/*          key={intensity.id}*/}
          {/*          className="relative flex flex-row items-start"*/}
          {/*        >*/}
          {/*          <View className="my-auto flex h-6 items-center">*/}
          {/*            <MyCheckbox*/}
          {/*              checked={intensity.intensity === value}*/}
          {/*              onChange={() => onChange(intensity.intensity)}*/}
          {/*            />*/}
          {/*          </View>*/}
          {/*          <View className="ml-3 text-sm leading-6">*/}
          {/*            <StyledText className={"text-dark-20 uppercase"}>{intensity.intensity.toString()}</StyledText>*/}
          {/*            <StyledText className={"text-light-10"}>*/}
          {/*              <StyledText style={{ color: intensity.color }}>{intensity.label}</StyledText> Intensity*/}
          {/*            </StyledText>*/}
          {/*          </View>*/}
          {/*        </Pressable>*/}
          {/*      ))}*/}
          {/*    </View>*/}
          {/*  )}*/}
          {/*/>*/}

          <Controller
            control={control}
            defaultValue={[]}
            name={"workouts"}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <StyledText>Programme Workout</StyledText>
                {value.map((workie: any, i) => (
                  <Card key={i}>
                    <StyledText>{workie.workout.title}</StyledText>
                  </Card>
                ))}
                <Pressable
                  className={
                    "flex h-14 grow flex-row items-center justify-center rounded-md border border-dashed border-white"
                  }
                  onPress={() => setModalVisible(true)}
                >
                  <PlusCircle stroke={"#01CFCC"} width={24} height={24} />
                  <StyledText>Add new workout</StyledText>
                </Pressable>
              </>
            )}
          />
          {errors.workouts && <StyledText className={"text-red"}>This is required.</StyledText>}

          <View className={"mb-4 flex gap-2"}>
            <Button onPress={handleSubmit(onSubmit)}>Save</Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default CreateProgramme;
