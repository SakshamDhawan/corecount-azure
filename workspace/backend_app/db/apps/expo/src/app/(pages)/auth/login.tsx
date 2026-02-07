import * as React from "react";
import { ToastAndroid, View } from "react-native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { Lock, User } from "~/assets/icons";
import StyledText from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import useAuth from "~/context/useAuth";
import { getBaseURL } from "~/context/useTRPC";
import { deleteToken } from "~/utils/sessionStore";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();

  const onSubmit = (data: any) => {
    login(data.email, data.password)
      .then((user) => {
        router.push("/(tabs)/dashboard");
      })
      .catch((err) => {
        void deleteToken();
        ToastAndroid.show("Failed to login", ToastAndroid.SHORT);
        throw err;
      });
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
            <Input
              icon={User}
              placeholder="Username"
              textContentType={"emailAddress"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <StyledText className={"text-red"}>{errors.email.message}</StyledText>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              icon={Lock}
              placeholder="Password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <StyledText className={"text-red"}>
            {errors.password.message}
          </StyledText>
        )}

        <View className={"mt-4 flex flex-col gap-2"}>
          <Button onPress={handleSubmit(onSubmit)}>Login</Button>

          <Button onPress={() => router.push("/auth/help")}>Need help?</Button>
        </View>
      </View>
    </>
  );
};

export default Login;
