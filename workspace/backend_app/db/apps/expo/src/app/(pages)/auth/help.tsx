import * as React from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import { User } from "~/assets/icons";
import StyledText from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";

const Help = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      text: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <View className={"m-auto flex flex-col"} />

      <View className={"flex flex-col justify-items-end gap-2"}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input icon={User} placeholder="Username" onBlur={onBlur} onChangeText={onChange} value={value} />
          )}
          name="email"
        />
        {errors.email && (
          <StyledText style={{ fontFamily: "Chillax-Regular" }} className={"text-red"}>
            This is required.
          </StyledText>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              multiline={true}
              numberOfLines={5}
              placeholder="Please tell us your problem"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="text"
        />
        {errors.text && (
          <StyledText style={{ fontFamily: "Chillax-Regular" }} className={"text-red"}>
            This is required.
          </StyledText>
        )}

        <Button onPress={handleSubmit(onSubmit)}>Send Message</Button>
      </View>
    </>
  );
};

export default Help;
