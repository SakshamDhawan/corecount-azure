import type { SubmitHandler } from "react-hook-form";
import * as React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import type { RegisterUser } from "@corecount/dbprisma/schemas";
import { registerSchema } from "@corecount/dbprisma/schemas";

import StyledText from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import useAuth from "~/context/useAuth";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({ resolver: zodResolver(registerSchema) });

  const { register } = useAuth();

  const onSubmit: SubmitHandler<RegisterUser> = (data) => {
    register(data)
      .then((r) => {
        router.push("/dashboard");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <View className={"m-auto flex flex-col"} />

      <View className={"flex flex-col justify-items-end gap-2"}>
        <View className={"flex gap-2"}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="email"
          />
          {errors.email && <StyledText className={"text-red"}>{errors.email.message}</StyledText>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input secureTextEntry placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="password"
          />
          {errors.password && <StyledText className={"text-red"}>{errors.password.message}</StyledText>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                secureTextEntry
                placeholder="Confirm password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="passwordConfirm"
          />
          {errors.passwordConfirm && <StyledText className={"text-red"}>{errors.passwordConfirm.message}</StyledText>}

          <Button onPress={handleSubmit(onSubmit)}>Register</Button>
        </View>
      </View>
    </>
  );
};

export default Register;
