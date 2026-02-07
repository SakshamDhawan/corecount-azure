import React from "react";
import { View } from "react-native";

import type { DifficultyType } from "@corecount/dbprisma/zod";

import { DifficultyBase, DifficultyFilled } from "~/assets/icons";

interface DifficultyIconsProps {
  difficulty: DifficultyType;
}

export const DifficultyIcons = ({ difficulty }: DifficultyIconsProps) => {
  return (
    <View className={"flex flex-row w-[105px]"}>
      {difficulty == "HARD" ? <DifficultyFilled /> : <DifficultyBase />}
      {difficulty == "HARD" || difficulty == "INTERMEDIATE" ? (
        <DifficultyFilled />
      ) : (
        <DifficultyBase />
      )}
      <DifficultyFilled />
    </View>
  );
};
