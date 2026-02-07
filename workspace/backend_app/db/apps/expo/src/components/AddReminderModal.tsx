import type { SubmitHandler } from "react-hook-form";
import * as React from "react";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTime } from "luxon";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { ReminderDaySchema } from "@corecount/dbprisma/zod";
import { colors } from "@corecount/tailwind-config/constants";

import { ChevronDown, Trash } from "~/assets/icons";
import SvgPlusCircle from "~/assets/icons/PlusCircle";
import StyledText, { typography } from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import MyCheckbox from "~/components/ui/Checkbox";
import LabelBar from "~/components/ui/LabelBar";
import useAuth from "~/context/useAuth";
import { api } from "~/context/useTRPC";

interface AddReminderProps {
  cancel: () => void;
  addReminder: (data: any) => void;
}

export const AddReminderSchema = z.object({
  days: ReminderDaySchema.array().min(1),
  time: z.date(),
  workout: z.string().cuid().optional(),
  programme: z.string().cuid().optional(),
});

export type AddReminderType = z.infer<typeof AddReminderSchema>;

const AddReminderModal = ({ ...props }: AddReminderProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<AddReminderType>({ resolver: zodResolver(AddReminderSchema) });

  const [showAdd, setShowAdd] = useState(false);
  const [attachWorkout, setAttachWorkout] = useState(false);
  const [attachProgramme, setAttachProgramme] = useState(false);

  const { user } = useAuth();

  const { data: workouts } = api.workouts.list.useQuery({
    select: { title: true, id: true },
  });
  const addReminderMutation = api.reminders.add.useMutation();

  const { data: programmes } = api.programmes.list.useQuery({
    where: { OR: [{ userId: user?.id }, { userId: null }] },
  });

  const onSubmit: SubmitHandler<AddReminderType> = (data) => {
    if (attachWorkout && data.workout === undefined) {
      setError("workout", { message: "Select a workout" });
    } else if (attachProgramme && data.programme === undefined) {
      setError("programme", { message: "Select a programme" });
    } else {
      const time = data.time;
      delete data.time;
      const dataNew: Partial<Omit<AddReminderType, "time">> & {
        user?: {
          connect: {
            id: string;
          };
        };
        programme?: {
          connect: {
            id: string;
          };
        };
        workout?: {
          connect: {
            id: string;
          };
        };
        hour?: number;
        minute?: number;
      } = { ...data };

      if (attachProgramme) {
        dataNew.programme = { connect: { id: data.programme } };
      }

      if (attachWorkout) {
        dataNew.workout = { connect: { id: data.workout } };
      }

      dataNew.user = { connect: { id: user?.id } };
      dataNew.hour = time.getHours();
      dataNew.minute = time.getMinutes();

      void addReminderMutation
        .mutateAsync({ data: dataNew, include: { workout: true, programme: true } })
        .then(props.addReminder);

      reset();
    }
  };

  useEffect(() => {
    if (attachProgramme) {
      setValue("workout", undefined);
    } else if (attachWorkout) {
      setValue("programme", undefined);
    } else if (!showAdd) {
      setValue("workout", undefined);
      setValue("programme", undefined);
    } else {
      setAttachWorkout(true);
      setAttachProgramme(false);
    }
  }, [showAdd, attachProgramme, attachWorkout]);

  const [showTimePicker, setshowTimePicker] = useState(false);

  return (
    <View className={"mx-8 mt-40 rounded-b-2xl bg-dark-50"}>
      <View className={"flex h-20 items-center justify-center rounded-t-2xl bg-dark-70 opacity-100"}>
        <StyledText className={"text-center text-light-10"}>ADD A REMINDER</StyledText>
      </View>
      <View className={"rounded-b-2xl bg-dark-60"}>
        <View className={"bg-dark-70 p-4"}>
          <StyledText style={typography.body.regular} className={"text-center text-light-60"}>
            Your reminder will be triggered at the time specified below.
          </StyledText>
        </View>

        <>
          <LabelBar label={"select a time"} />

          <Controller
            control={control}
            name={"days"}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
              <>
                <View className={"m-4 flex flex-row justify-between"}>
                  {ReminderDaySchema.options.map((option) => (
                    <Pressable
                      onPress={() => {
                        if (value.includes(option)) {
                          onChange(value.filter((day) => day !== option));
                        } else {
                          onChange([...value, option]);
                        }
                      }}
                    >
                      <View className={"mx-2 flex items-center"}>
                        <StyledText className={"capitalize"}>
                          <StyledText
                            style={{ color: value.includes(option) ? colors.light["10"] : colors.dark["20"] }}
                          >
                            {option}
                          </StyledText>
                        </StyledText>
                        <MyCheckbox
                          onChange={() => {
                            if (value.includes(option)) {
                              onChange(value.filter((day) => day !== option));
                            } else {
                              onChange([...value, option]);
                            }
                          }}
                          checked={value.includes(option)}
                        ></MyCheckbox>
                      </View>
                    </Pressable>
                  ))}
                </View>
                {errors.days && <StyledText>{errors.days.message}</StyledText>}
              </>
            )}
          />
        </>

        <Controller
          control={control}
          name={"time"}
          defaultValue={DateTime.now().set({ second: 0, millisecond: 0 }).toJSDate()}
          render={({ field: { onChange, value } }) => (
            <>
              <Pressable
                className={"m-4 h-16 rounded-md border border-dark-40"}
                onPress={() => setshowTimePicker(true)}
              >
                <View className={"h-full w-full items-center justify-center"}>
                  <View className={"mx-4 flex flex-row items-center justify-center"}>
                    <StyledText className={"grow text-light-60"}>{value.toLocaleTimeString()}</StyledText>
                    <View className={"right-0"}>
                      <ChevronDown width={24} height={24} stroke={colors.green} />
                    </View>
                  </View>
                </View>
              </Pressable>
              {showTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value}
                  mode={"time"}
                  is24Hour={true}
                  onChange={({ nativeEvent }) => {
                    onChange(new Date(nativeEvent.timestamp));
                    setshowTimePicker(false);
                  }}
                />
              )}
            </>
          )}
        />
        <View className={"flex gap-y-4"}>
          <View>
            {programmes && workouts && (
              <>
                {showAdd && (
                  <>
                    <View className={"flex h-10 flex-row items-center justify-center bg-dark-70"}>
                      <StyledText>SELECT WORKOUT</StyledText>
                      <Pressable onPress={() => setShowAdd(false)} className={"right-0 flex"}>
                        <Trash width={24} height={24} stroke={colors.red} strokeWidth={2} />
                      </Pressable>
                    </View>

                    <View className={"m-4 flex flex-row justify-evenly"}>
                      <View className={"items-center gap-y-4"}>
                        <StyledText>Exercise</StyledText>
                        <MyCheckbox
                          checked={attachWorkout}
                          onChange={() => {
                            setAttachWorkout((prevState) => !prevState);
                            setAttachProgramme(false);
                          }}
                        />
                      </View>
                      <View className={"items-center gap-y-4"}>
                        <StyledText>Programme</StyledText>
                        <MyCheckbox
                          checked={attachProgramme}
                          onChange={() => {
                            setAttachProgramme((prevState) => !prevState);
                            setAttachWorkout(false);
                          }}
                        />
                      </View>
                    </View>
                  </>
                )}

                <Controller
                  control={control}
                  name={"workout"}
                  render={({ field: { onChange, value } }) => (
                    <>
                      {showAdd && attachWorkout && (
                        <View>
                          <View
                            className={"flex flex-row items-center rounded-md border px-5 py-5"}
                            style={{ borderColor: "rgba(255,255,255,0.3)" }}
                          >
                            <RNPickerSelect
                              useNativeAndroidPickerStyle={false}
                              onValueChange={(value) => onChange(value.id)}
                              items={workouts.map((workout) => {
                                return { label: workout.title, value: workout };
                              })}
                            />
                          </View>
                        </View>
                      )}
                    </>
                  )}
                />
                {errors.workout && attachWorkout && (
                  <StyledText className={"text-red"}>{errors.workout.message}</StyledText>
                )}

                <Controller
                  control={control}
                  name={"programme"}
                  render={({ field: { onChange, value } }) => (
                    <>
                      {showAdd && attachProgramme && (
                        <View>
                          <View
                            className={"flex flex-row items-center rounded-md border px-5 py-5"}
                            style={{ borderColor: "rgba(255,255,255,0.3)" }}
                          >
                            <RNPickerSelect
                              useNativeAndroidPickerStyle={false}
                              onValueChange={(value) => onChange(value.id)}
                              items={programmes.map((programme) => {
                                return { label: programme.name, value: programme };
                              })}
                            />
                          </View>
                        </View>
                      )}
                    </>
                  )}
                />
                {errors.programme && attachProgramme && (
                  <StyledText className={"text-red"}>{errors.programme.message}</StyledText>
                )}

                {!showAdd && (
                  <Pressable
                    onPress={() => setShowAdd(true)}
                    className={
                      "flex h-14 grow flex-row items-center justify-center gap-x-4 rounded-md border border-dashed border-dark-20 bg-dark-80"
                    }
                    android_ripple={{ color: "dark" }}
                  >
                    <SvgPlusCircle width={24} height={24} stroke={colors.green} />
                    <StyledText className={"text-center uppercase text-light-10"} style={typography.button.semibold}>
                      ADD SPECIFIC WORKOUT
                    </StyledText>
                  </Pressable>
                )}
              </>
            )}
          </View>
        </View>
        <View className={"mx-8 flex flex-row gap-2 p-4"}>
          <Button onPress={() => props.cancel()} className={"flex-1"}>
            CANCEL
          </Button>
          <Button onPress={handleSubmit(onSubmit)} className={"flex-1"}>
            SAVE
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AddReminderModal;
