import { View } from "react-native";

import type { CompletedWorkoutWithPartialRelations } from "@corecount/dbprisma/zod";

import StyledText, { typography } from "~/components/styled/StyledText";
import Card from "~/components/ui/Card";
import { getMinutes, getSeconds } from "~/utils/timeCalc";

interface ExerciseCardType {
  workout: CompletedWorkoutWithPartialRelations;
}

const LatestExerciseCard = ({ workout, ...props }: ExerciseCardType) => {
  if (workout.workout === undefined) return <View></View>;

  return (
    <Card className={"flex bg-dark-70"}>
      <View className={"flex flex-row justify-between"}>
        <View>
          <StyledText style={typography.body.medium}>
            {workout.workout.title}
          </StyledText>
        </View>
      </View>
      <View className={"flex flex-row items-end justify-between"}>
        <StyledText className={"text-light-10"} style={typography.bigNumber}>
          {workout.points}
          <StyledText className={"text-dark-20"} style={{}}>
            Points
          </StyledText>
        </StyledText>

        <StyledText>
          <StyledText style={typography.h2}>
            {getMinutes(workout.duration / 1000)}
          </StyledText>
          <StyledText style={typography.body.medium} className={"text-dark-30"}>
            M
          </StyledText>
          <StyledText style={typography.h2}>
            {getSeconds(workout.duration / 1000)}
          </StyledText>
          <StyledText style={typography.body.medium} className={"text-dark-30"}>
            S
          </StyledText>
        </StyledText>
      </View>
    </Card>
  );
};

export default LatestExerciseCard;
