import * as React from "react";
import { useState } from "react";
import { FlatList, Modal, View } from "react-native";
import { router } from "expo-router";
import queryString from "query-string";
import { Controller, useForm } from "react-hook-form";

import {
  difficultyOptions,
  repsOptions,
} from "~/app/(pages)/programmes/create";
import ProgrammeCard from "~/components/ProgrammeCard";
import StyledText, { typography } from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import LabelBar from "~/components/ui/LabelBar";
import MySlider from "~/components/ui/Slider";
import useAuth from "~/context/useAuth";
import { api } from "~/context/useTRPC";

export const Programmes = () => {
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    data: programmes,
    isFetched,
    refetch,
    isRefetching,
  } = api.programmes.list.useQuery({
    where: { OR: [{ userId: user?.id }, { userId: null }] },
  });

  const onSubmit = (data: any) => {
    const q = queryString.stringify(data);
    setModalVisible(false);
    reset();
    router.push(`/programmes/${data.programme}?${q}`);
  };

  const [modalVisible, setModalVisible] = useState(false);

  function startProgramme(id: string): void {
    setModalVisible(true);
    setValue("programme", id);
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
              CONFIGURE PROGRAMME
            </StyledText>
          </View>
          <View className={"rounded-b-2xl bg-dark-60"}>
            <View className={"m-8 flex gap-y-4"}>
              <LabelBar label={"Select strength"} />
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

              <View className={"mx-8 flex flex-row gap-2 p-4"}>
                <Button
                  onPress={() => setModalVisible(false)}
                  className={"flex-1"}
                >
                  CANCEL
                </Button>
                <Button onPress={handleSubmit(onSubmit)} className={"flex-1"}>
                  START
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {isFetched && (
        <FlatList
          data={programmes}
          renderItem={({ item }) => (
            <ProgrammeCard
              key={item.id}
              programme={item}
              onPress={() => startProgramme(item.id)}
            />
          )}
          onRefresh={refetch}
          refreshing={isRefetching}
          ItemSeparatorComponent={() => <View className={"h-4"} />}
        />
      )}
    </>
  );
};

export default Programmes;
