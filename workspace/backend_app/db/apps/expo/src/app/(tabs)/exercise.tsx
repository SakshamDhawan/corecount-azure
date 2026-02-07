import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";

import { PlusCircle } from "~/assets/icons";
import Exercises from "~/components/Exercises";
import Programmes from "~/components/Programmes";
import StyledText from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import IconButton from "~/components/ui/IconButton";
import GlobalLayout from "~/components/ui/GlobalLayout";

const Exercise = () => {
  const [page, setPage] = useState<"exercises" | "programmes">("exercises");

  const iconRight =
    page === "programmes" ? (
      <IconButton
        onPress={() => router.push("/(pages)/programmes/create")}
        size={"small"}
        shape={"circle"}
        icon={PlusCircle}
      />
    ) : null;

  return (
    <>
      <GlobalLayout>
        <TitleBar iconRight={iconRight}>WORKOUTS</TitleBar>

        <View className={"mb-8 flex flex-row justify-evenly"}>
          <Pressable onPress={() => setPage("exercises")}>
            <StyledText
              className={"text-light-10"}
              style={{
                textDecorationLine: page === "exercises" ? "underline" : "none",
              }}
            >
              Exercises
            </StyledText>
          </Pressable>
          <Pressable onPress={() => setPage("programmes")}>
            <StyledText
              className={"text-light-10"}
              style={{
                textDecorationLine:
                  page === "programmes" ? "underline" : "none",
              }}
            >
              Programmes
            </StyledText>
          </Pressable>
        </View>
      </GlobalLayout>
      {page === "exercises" ? <Exercises /> : <Programmes />}
      {/*<View className="h-40"></View>*/}
    </>
  );
};

export default Exercise;
