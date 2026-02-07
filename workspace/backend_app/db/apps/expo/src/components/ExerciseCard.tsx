import { Text, View } from "react-native";

import type { CombinedWorkout } from "~/components/Exercises";
import StyledText, { typography } from "~/components/styled/StyledText";
import Card from "~/components/ui/Card";
import { DifficultyIcons } from "~/components/ui/DifficultyIcons";
import { getMinutes, getSeconds } from "~/utils/timeCalc";

interface ExerciseCardType {
  workout: CombinedWorkout;
}

const ExerciseCard = ({ workout, ...props }: ExerciseCardType) => {
  return (
    <View className={"grow"}>
      <Card className={"flex bg-dark-50"}>
        <View className={"flex flex-row justify-between"}>
          <StyledText
            style={typography.body.large.semibold}
            className={"shrink"}
          >
            {workout.workout.title}
          </StyledText>
          <DifficultyIcons difficulty={workout.workout.difficulty} />
        </View>
        <View className={"flex flex-row items-end justify-between"}>
          <View>
            <StyledText className={"text-light-10"} style={typography.h2}>
              {workout.completions | 0}
            </StyledText>
            <StyledText className={"text-dark-20"} style={{}}>
              Completions
            </StyledText>
          </View>
          <StyledText>
            <StyledText style={typography.h2}>
              {getMinutes(workout.duration / 1000)}
            </StyledText>
            <StyledText
              style={typography.body.medium}
              className={"text-dark-30"}
            >
              M
            </StyledText>
            <StyledText style={typography.h2}>
              {getSeconds(workout.duration / 1000)}
            </StyledText>
            <StyledText
              style={typography.body.medium}
              className={"text-dark-30"}
            >
              S
            </StyledText>
          </StyledText>
        </View>
      </Card>
    </View>
  );
};

export default ExerciseCard;
