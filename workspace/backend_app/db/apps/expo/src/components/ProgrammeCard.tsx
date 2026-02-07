import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import type { ProgrammeWithPartialRelations } from "@corecount/dbprisma/zod";

import StyledText, { typography } from "~/components/styled/StyledText";
import Card from "~/components/ui/Card";
import { DifficultyIcons } from "~/components/ui/DifficultyIcons";
import useAuth from "~/context/useAuth";
import { api } from "~/context/useTRPC";
import { toMinutesSecondsTimer } from "~/utils/timeCalc";

interface ProgrammeCardProps {
  programme: ProgrammeWithPartialRelations;
  onPress: () => void;
}

const ProgrammeCard = ({ programme, onPress }: ProgrammeCardProps) => {
  const { user } = useAuth();

  const [completions, setCompletions] = useState(0);
  const [duration, setDuration] = useState(0);

  const { data: completedProgrammes } = api.completedProgrammes.list.useQuery({
    where: { userId: user?.id, programmeId: programme.id },
    include: { programme: true, workouts: true },
  });

  useEffect(() => {
    if (completedProgrammes) {
      // console.log(completedProgrammes);
      // Calculate the number of completions
      setCompletions(
        completedProgrammes.filter((programme) => programme.completed).length,
      );

      const durationz = completedProgrammes
        .flatMap((programme) => programme.workouts)
        .reduce((a, b) => a + b.duration, 0);
      setDuration(durationz);
    }
  }, [completedProgrammes]);

  return (
    <Pressable onPress={onPress}>
      <Card className={"flex bg-dark-50"}>
        <View className={"flex flex-row justify-between"}>
          <View>
            <StyledText className={"text-light-10"} style={{ fontSize: 18 }}>
              {programme.name}
            </StyledText>
            <StyledText className={"text-light-10"}>
              {programme.workouts.length}{" "}
              <StyledText className={"text-dark-20"}>exercises </StyledText>
            </StyledText>
          </View>
          {/*<DifficultyIcons difficulty={"INTERMEDIATE"} />*/}
        </View>
        <View className={"flex flex-row items-end justify-between"}>
          <View>
            <StyledText
              className={"text-light-10"}
              style={typography.bigNumber}
            >
              {completions}
            </StyledText>
            <StyledText className={"text-light-10"} style={{}}>
              Completions
            </StyledText>
          </View>
          <StyledText
            className={"text-light-10"}
            style={{ fontFamily: "Chillax-Regular" }}
          >
            {toMinutesSecondsTimer(duration / 1000)}
          </StyledText>
        </View>
      </Card>
    </Pressable>
  );
};

export default ProgrammeCard;
