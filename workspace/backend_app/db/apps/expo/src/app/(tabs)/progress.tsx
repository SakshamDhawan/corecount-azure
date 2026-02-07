import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { DateTime } from "luxon";

import type { CompletedWorkout } from "@corecount/dbprisma/zod";

import { ChevronLeft, ChevronRight } from "~/assets/icons";
import LatestExerciseCard from "~/components/LatestExerciseCard";
import ProgressGraph from "~/components/ProgressGraph";
import StyledText, { typography } from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import Card from "~/components/ui/Card";
import GlobalLayout from "~/components/ui/GlobalLayout";
import useAuth from "~/context/useAuth";
import { api } from "~/context/useTRPC";

type GraphDataType = {
  date: DateTime;
  duration: number;
  data: CompletedWorkout[];
}[];

const Progress = () => {
  const now = DateTime.now();

  const firstDay = now.set({
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  const lastDay = now.set({
    weekday: 7,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const [range, setRange] = useState<{ first: DateTime; last: DateTime }>({
    first: firstDay,
    last: lastDay,
  });

  const { user } = useAuth();

  const utils = api.useUtils();

  const [weekdays, setWeekdays] = useState<GraphDataType | undefined>(
    undefined,
  );

  useEffect(() => {
    void utils.completedWorkouts.list
      .fetch({
        where: {
          userId: user?.id,
          createdAt: {
            lte: range.last.toJSDate(),
            gte: range.first.toJSDate(),
          },
        },
        include: { workout: true, completedProgramme: true },
        orderBy: {
          createdAt: "desc",
        },
      })
      .then((workouts) => {
        const graphDate: GraphDataType = Array.from({ length: 7 }, (_, i) => ({
          // @ts-ignore
          date: now.set({
            weekday: i,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          }),
          data: [],
          duration: 0,
        }));

        workouts.forEach((session) => {
          const weekdayIndex =
            DateTime.fromJSDate(new Date(session.createdAt)).weekday - 1;
          const data = graphDate[weekdayIndex];
          if (data) {
            data.data.push(session);
            data.duration += session.points;
          }
        });

        setWeekdays(graphDate);
      });
  }, [range]);

  function prevWeek(currentRage: { first: DateTime; last: DateTime }): void {
    const firstDay = currentRage.first.minus({ week: 1 });
    const lastDay = currentRage.last.minus({ week: 1 });

    setRange({ first: firstDay, last: lastDay });
  }

  function nextWeek(currentRage: { first: DateTime; last: DateTime }): void {
    const firstDay = currentRage.first.plus({ week: 1 });
    const lastDay = currentRage.last.plus({ week: 1 });

    setRange({ first: firstDay, last: lastDay });
  }

  return (
    <GlobalLayout>
      <ScrollView>
        <View>
          <TitleBar>YOUR PROGRESS</TitleBar>
        </View>

        <View className={"flex flex-row justify-between"}>
          <View>
            <Pressable onPress={() => prevWeek(range)}>
              <ChevronLeft width={24} height={24} stroke={"#425A6E"} />
            </Pressable>
          </View>
          <View>
            <StyledText
              className={"text-dark-40"}
              style={typography.body.small.regular}
            >
              {range.first.toFormat("d")} - {range.last.toFormat("d LLLL")}
            </StyledText>
          </View>
          <View>
            <Pressable onPress={() => nextWeek(range)}>
              <ChevronRight width={24} height={24} stroke={"#425A6E"} />
            </Pressable>
          </View>
        </View>
        <View className={"text-center"}>
          <StyledText>Points for this week</StyledText>
        </View>
        <View className={"my-4 flex flex-row"}>
          {weekdays && (
            <>
              <ProgressGraph
                weekdays={weekdays.map((weekday) => ({
                  date: weekday.date,
                  duration: weekday.duration,
                }))}
              />
            </>
          )}
        </View>
        <View className={"gap-y-5 rounded-t-2xl bg-dark-80 my-8"}>
          <StyledText>
            Total workouts this week:{" "}
            {weekdays?.reduce((a, b) => a + b.data.length, 0)}
          </StyledText>
          <StyledText>
            Total points this week:{" "}
            {weekdays?.reduce(
              (a, b) => a + b.data.reduce((a, b) => a + b.points, 0),
              0,
            )}
          </StyledText>
        </View>
        <View className={"gap-y-5 rounded-t-2xl bg-dark-80"}>
          {weekdays?.map((weekday) => (
            <View key={weekday.date.toMillis()}>
              {weekday.data.length > 0 && (
                <View key={weekday.date.weekday}>
                  <StyledText style={typography.h2} className={"text-dark-40"}>
                    {weekday.date.plus({ day: 1 }).toFormat("cccc d LLLL")}
                  </StyledText>
                  <View className={"flex gap-y-5 bg-dark-80"}>
                    {weekday.data.map((session) => (
                      <Pressable
                        // onPress={() => router.push(`/workouts/${session.id}`)}
                        key={session.id}
                      >
                        <LatestExerciseCard workout={session} />
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </GlobalLayout>
  );
};

export default Progress;
