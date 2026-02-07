import * as React from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Controller, useForm } from "react-hook-form";

import StyledText from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import LabelBar from "~/components/ui/LabelBar";
import { api } from "~/context/useTRPC";

interface AddWorkoutModalProps {
  cancel: () => void;
  addWorkout: (data: any) => void;
}

const AddWorkoutModal = ({ ...props }: AddWorkoutModalProps) => {
  const {
    control: controlWorkout,
    handleSubmit: handleSubmitWorkout,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      workout: null,
    },
  });

  const { data: workouts } = api.workouts.list.useQuery({
    select: { title: true, id: true },
  });

  const onSubmitWorkout = (data: any) => {
    props.addWorkout(data);
    reset();
  };

  if (!workouts) return <></>;

  return (
    <View className={"mx-8 mt-40 rounded-b-2xl"}>
      <View className={"flex h-20 items-center justify-center rounded-t-2xl bg-dark-70"}>
        <StyledText className={"text-center text-light-10"}>ADD AN EXERCISE</StyledText>
      </View>
      <View className={"rounded-b-2xl bg-dark-60"}>
        <View className={"m-8 flex gap-y-4"}>
          <Controller
            control={controlWorkout}
            name={"workout"}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <LabelBar label={"Select an exercise"} />
                <View
                  className={"flex flex-row items-center rounded-md border px-5 py-5"}
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}
                >
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => onChange(value)}
                    items={workouts.map((workout) => {
                      return { label: workout.title, value: workout };
                    })}
                  />
                  <StyledText>{value?.title}</StyledText>
                </View>
              </>
            )}
          />

          {errors.workout && <StyledText className={"text-red"}>This is required.</StyledText>}
          <View className={"mx-8 flex flex-row gap-2 p-4"}>
            <Button onPress={() => props.cancel()} className={"flex-1"}>
              CANCEL
            </Button>
            <Button onPress={handleSubmitWorkout(onSubmitWorkout)} className={"flex-1"}>
              ADD
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddWorkoutModal;
