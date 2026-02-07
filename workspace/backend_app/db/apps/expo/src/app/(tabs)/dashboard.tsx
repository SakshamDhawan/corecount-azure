import * as React from "react";
import {
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";

import { Link, router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import dummy from "../../../assets/dummy/profile.png";
import { Alert } from "~/assets/icons";
import LatestExerciseCard from "~/components/LatestExerciseCard";
import StyledText, { typography } from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import Button from "~/components/ui/Button";
import Card from "~/components/ui/Card";
import LabelBar from "~/components/ui/LabelBar";
import GlobalLayout from "~/components/ui/GlobalLayout";
import useAuth from "~/context/useAuth";
import useBLE from "~/context/useBLE";
import { api } from "~/context/useTRPC";

const Dashboard = () => {
  const { calibrated } = useBLE();
  const screenDimX = Dimensions.get("screen").width;

  const { user } = useAuth();

  const {
    data: articles,
    refetch: refetchArticles,
    isRefetching: isRefetchingArticles,
  } = api.articles.list.useQuery({});

  const {
    data: Exercises,
    refetch: refetchExercises,
    isRefetching: isRefetchingExercises,
  } = api.completedWorkouts.list.useQuery({
    where: { userId: user?.id },
    include: {
      workout: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const refresh = () => {
    void refetchArticles();
    void refetchExercises();
  };

  return (
    <GlobalLayout>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingArticles || isRefetchingExercises}
            onRefresh={refresh}
          />
        }
      >
        <View className={"flex gap-4"}>
          <TitleBar
          // iconLeft={
          //   <IconButton shape={"circle"} size={"small"} icon={ChevronLeft} />
          // }
          // iconRight={
          //   <IconButton shape={"circle"} size={"small"} icon={Filter} />
          // }
          >
            YOUR ACTIVITY
          </TitleBar>

          <View className={"mb-8 flex flex-row justify-evenly"}>
            <Image
              contentFit="cover"
              source={dummy}
              style={{
                width: 100,
                height: 100,
                alignContent: "center",
                borderRadius: 50,
              }}
              transition={500}
            />
            {/*<View className={"justify-end"}>*/}
            {/*  <IconButton icon={Award} size={"regular"} shape={"square"} />*/}
            {/*</View>*/}

            {/*<View className={"relative flex flex-col"}>*/}
            {/*  <ProgressBar size={100} progress={30} />*/}

            {/*  <View className={"relative"}>*/}
            {/*    <View className={"relative h-5"}>*/}
            {/*      <View*/}
            {/*        className={*/}
            {/*          "absolute -bottom-0 left-1/2 mx-auto flex w-20 -translate-x-1/2 justify-center rounded-full bg-dark-50 pt-1"*/}
            {/*        }*/}
            {/*      >*/}
            {/*        <View className={"flex items-center justify-center"}>*/}
            {/*          <StyledText*/}
            {/*            className={"text-center text-light-10"}*/}
            {/*            style={typography.h1}*/}
            {/*          >*/}
            {/*            38*/}
            {/*          </StyledText>*/}
            {/*        </View>*/}

            {/*        <View className="relative">*/}
            {/*          <View*/}
            {/*            className={*/}
            {/*              "absolute -bottom-3 left-1/2 mx-auto flex -translate-x-1/2 rounded-md bg-dark-40 px-1"*/}
            {/*            }*/}
            {/*          >*/}
            {/*            <StyledText className={"text-dark-90"}>%</StyledText>*/}
            {/*          </View>*/}
            {/*        </View>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*  </View>*/}

            {/*  <StyledText*/}
            {/*    className={"mt-4 text-center"}*/}
            {/*    style={{ color: colors.dark["20"] }}*/}
            {/*  >*/}
            {/*    62 points remaining*/}
            {/*  </StyledText>*/}
            {/*</View>*/}
            {/*<View className={"justify-end"}>*/}
            {/*  <IconButton icon={Cog} size={"regular"} shape={"square"} />*/}
            {/*</View>*/}
          </View>

          {/*<UserGraph></UserGraph>*/}

          <LabelBar label={"Your device"} />
          {!calibrated ? (
            <Card className={"flex flex-row gap-4 bg-red/20"}>
              <View>
                <View className={"rounded-xl bg-red p-2"}>
                  <Alert stroke={"#000"} width={24} height={24} />
                </View>
              </View>
              <View>
                <StyledText style={typography.h4}>
                  You need to calibrate your device before exercising.
                </StyledText>
                <Pressable onPress={() => router.push("/calibrate")}>
                  <StyledText
                    style={typography.button.small.regular}
                    className={"uppercase text-red"}
                  >
                    Calibrate now{" "}
                    <FontAwesome6
                      name={"arrow-right"}
                      width={20}
                      height={20}
                      stroke={"#f00"}
                    />
                  </StyledText>
                </Pressable>
              </View>
            </Card>
          ) : (
            <View className={"flex gap-y-4"}>
              {/*<LabelBar*/}
              {/*  label={"Your Sensors"}*/}
              {/*  actions={{*/}
              {/*    onClick: () => router.push("/sensors"),*/}
              {/*  }}*/}
              {/*/>*/}
              {/*/!*<Card></Card>*!/*/}

              <Button onPress={() => router.push("/sensors")}>Sensors</Button>
            </View>
          )}
          <View className={"flex gap-y-4"}>
            <LabelBar
              label={"Latest Workout"}
              actions={{
                label: "view more",
                onClick: () => router.replace("/exercise"),
              }}
            />
            {Exercises && Exercises.length > 0 && Exercises[0] && (
              <LatestExerciseCard workout={Exercises[0]} />
            )}
          </View>

          <View className={"flex flex-col gap-y-4"}>
            <LabelBar label={"Discover"} />
            {articles?.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`}>
                <View
                  className={"flex h-full w-full rounded-2xl bg-dark-40"}
                  key={article.id}
                >
                  <View className={"w-full"}>
                    {article.image && (
                      <Image
                        source={article.image}
                        style={{ width: screenDimX - 20, height: 200 }}
                        className={"aspect-ratio rounded-t-2xl"}
                      />
                    )}
                  </View>

                  <View className={"h-full w-full"}>
                    <StyledText className={"p-6 text-center text-light-10"}>
                      {article.title}
                    </StyledText>
                  </View>
                </View>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </GlobalLayout>
  );
};

export default Dashboard;
