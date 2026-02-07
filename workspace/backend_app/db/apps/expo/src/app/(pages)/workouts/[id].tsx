import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { colors } from "@corecount/tailwind-config/constants";

import { Clock, DifficultyBase, FaceBad, FaceGood, FaceNeutral, FaceVBad, FaceVGood, Star } from "~/assets/icons";
import StyledText, { typography } from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import PageLayout from "~/components/ui/PageLayout";
import { api } from "~/context/useTRPC";

const WorkoutView = () => {
  const { id } = useLocalSearchParams();
  const { data: completedWorkout, isFetched } = api.completedWorkouts.byId.useQuery({ where: { id: id } });

  return (
    <>
      {isFetched && (
        <>
          <PageLayout>
            <StyledText>Good workout!</StyledText>
            <StyledText>{completedWorkout.createdAt.toLocaleString()}</StyledText>

            <View className={"flex flex-row justify-around"}>
              <View>
                <View className={"size-16 items-center justify-center rounded-full bg-dark-60"}>
                  <Clock stroke={"#A16EFF"} />
                </View>
                <StyledText className={"text-purple"}>
                  <StyledText className={"text-purple"} style={typography.h1}>
                    6
                  </StyledText>
                  <StyledText className={"text-purple"} style={typography.body.medium}>
                    m
                  </StyledText>

                  <StyledText className={"text-purple"} style={typography.h1}>
                    27
                  </StyledText>
                  <StyledText className={"text-purple"} style={typography.body.medium}>
                    s
                  </StyledText>
                </StyledText>
                <StyledText>Duration</StyledText>
              </View>
              <View>
                <View className={"size-16 items-center justify-center rounded-full bg-dark-60"}>
                  <Star stroke={colors.purple} />
                </View>
                <StyledText className={"text-yellow-400"} style={typography.h1}>
                  GOLD
                </StyledText>
                <StyledText>Duration</StyledText>
              </View>
              <View>
                <View className={"size-16 items-center justify-center rounded-full bg-dark-60"}>
                  <DifficultyBase stroke={colors.purple} />
                </View>
                <StyledText className={"text-purple"}>
                  <StyledText className={"text-purple"} style={typography.h1}>
                    6
                  </StyledText>
                  <StyledText className={"text-purple"} style={typography.body.medium}>
                    m
                  </StyledText>

                  <StyledText className={"text-purple"} style={typography.h1}>
                    27
                  </StyledText>
                  <StyledText className={"text-purple"} style={typography.body.medium}>
                    s
                  </StyledText>
                </StyledText>
                <StyledText>Reps</StyledText>
              </View>
            </View>

            <View className={"flex flex-row justify-around"}>
              <View
                className={"h-8 w-8 items-center justify-center rounded-full"}
                style={{ backgroundColor: completedWorkout.rating === 1 ? colors.green : colors.dark["80"] }}
              >
                <FaceVBad
                  stroke={completedWorkout.rating === 1 ? colors.dark["90"] : colors.light["80"]}
                  width={24}
                  height={24}
                />
              </View>
              <View
                className={"h-8 w-8 items-center justify-center rounded-full"}
                style={{ backgroundColor: completedWorkout.rating === 2 ? colors.green : colors.dark["80"] }}
              >
                <FaceBad
                  stroke={completedWorkout.rating === 2 ? colors.dark["90"] : colors.light["80"]}
                  width={24}
                  height={24}
                />
              </View>
              <View
                className={"h-8 w-8 items-center justify-center rounded-full"}
                style={{ backgroundColor: completedWorkout.rating === 3 ? colors.green : colors.dark["80"] }}
              >
                <FaceNeutral
                  stroke={completedWorkout.rating === 3 ? colors.dark["90"] : colors.light["80"]}
                  width={24}
                  height={24}
                />
              </View>
              <View
                className={"h-8 w-8 items-center justify-center rounded-full"}
                style={{ backgroundColor: completedWorkout.rating === 4 ? colors.green : colors.dark["80"] }}
              >
                <FaceGood
                  stroke={completedWorkout.rating === 4 ? colors.dark["90"] : colors.light["80"]}
                  width={24}
                  height={24}
                />
              </View>
              <View
                className={"h-8 w-8 items-center justify-center rounded-full"}
                style={{ backgroundColor: completedWorkout.rating === 5 ? colors.green : colors.dark["80"] }}
              >
                <FaceVGood
                  stroke={completedWorkout.rating === 5 ? colors.dark["90"] : colors.light["80"]}
                  width={24}
                  height={24}
                />
              </View>
            </View>

            <StyledText style={typography.h2}>Comments</StyledText>
            <StyledText style={typography.body.small.regular} className={"text-dark-30"}>
              {completedWorkout.comments}
            </StyledText>

            <View className={"grow"}></View>
            <View>
              <Button onPress={() => router.push(`/freestyle/${completedWorkout.workoutId}`)}>GO TO WORKOUT</Button>
            </View>
          </PageLayout>
        </>
      )}
    </>
  );
};

export default WorkoutView;
