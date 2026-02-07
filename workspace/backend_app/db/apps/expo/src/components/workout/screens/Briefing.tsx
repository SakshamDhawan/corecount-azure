import type { VideoRef } from "react-native-video";
import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import RenderHtml from "react-native-render-html";
import Video from "react-native-video";
import { router } from "expo-router";

import type { StartWorkoutProps } from "~/components/workout/screens/StartExercise";
import { ChevronLeft, Pause, Play } from "~/assets/icons";
import StyledText, { typography } from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import Button from "~/components/ui/Button";
import IconButton from "~/components/ui/IconButton";
import { api, getBaseURL } from "~/context/useTRPC";

type BriefProps = StartWorkoutProps & {
  onStart: () => void;
};
const BriefingExercise = ({ ...props }: BriefProps) => {
  const videoRef = useRef<VideoRef>(null);
  const [playing, setPlaying] = useState(false);

  const { data: workout, isFetched } = api.workouts.byId.useQuery({
    id: props.id,
  });

  function NumberOfTotal() {
    if (!props.totalWorkouts || !props.currentWorkout) return <View />;

    return (
      <StyledText
        style={typography.button.small.regular}
        className={"text-dark-20"}
      >
        Exercise
        <StyledText
          style={typography.button.small.regular}
          className={"text-light-10"}
        >
          {" " + (props.currentWorkout + 1) + " "}
        </StyledText>
        of
        <StyledText
          style={typography.button.small.regular}
          className={"text-light-10"}
        >
          {" " + props.totalWorkouts}
        </StyledText>
      </StyledText>
    );
  }

  const toggle = () => {
    if (playing) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.resume();
    }

    setPlaying(!playing);
  };
  return (
    <>
      {isFetched && workout && (
        <>
          <TitleBar
            iconLeft={
              <IconButton
                shape={"circle"}
                onPress={() => router.back()}
                size={"small"}
                icon={ChevronLeft}
              />
            }
            // iconRight={<IconButton shape={"circle"} size={"small"} icon={Placeholder} />}
          ></TitleBar>

          <View className={"relative -mb-24 mt-20 h-64 w-full -ml-2"}>
            <View className={"absolute -top-40 -z-10 max-h-64 w-full"}>
              <Video
                // Can be a URL or a local file.
                source={{
                  uri: `${getBaseURL()}/uploads/${workout.video}`,
                }}
                onEnd={() => {
                  setPlaying(false);
                  videoRef.current?.seek(0);
                  videoRef.current?.pause();
                }}
                ref={videoRef}
                paused={true}
                style={styles.backgroundVideo}
              />
              <View
                className={
                  "translate-y-1/3✓ absolute left-1/2 top-1/2 -translate-x-1/2 transform rounded-full p-4 opacity-80"
                }
              >
                <IconButton
                  onPress={() => toggle()}
                  icon={playing ? Pause : Play}
                  size={"regular"}
                  shape={"circle"}
                />
              </View>
            </View>
          </View>

          <View className={"gap-y-4 rounded-t-xl bg-dark-80 px-6 pt-6"}>
            {/*<StyledText>*/}
            {/*  ${getBaseURL()}/uploads/${workout.video}*/}
            {/*</StyledText>*/}
            <NumberOfTotal />

            <StyledText
              style={{
                fontSize: 28,
                fontWeight: "semibold",
                color: "white",
              }}
            >
              {workout.title}
            </StyledText>

            <StyledText>
              {props.reps} Reps | {props.strength.toString()} Strength
            </StyledText>

            {/*<StyledText*/}
            {/*  style={{*/}
            {/*    fontSize: 16,*/}
            {/*    color: "gray",*/}
            {/*  }}*/}
            {/*>*/}
            {/*  {workout.description}*/}
            {/*</StyledText>*/}

            <Button onPress={() => props.onStart()}>START WORKOUT</Button>

            <View className={"p-4"}>
              <RenderHtml
                enableCSSInlineProcessing={false}
                systemFonts={["Chillax-Regular"]}
                contentWidth={Dimensions.get("window").width}
                source={{ html: workout.content }}
                baseStyle={mixedStyle.base}
                tagsStyles={mixedStyle.mixed}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    width: Dimensions.get("window").width,
    height: 350,
  },
});
const mixedStyle = {
  base: {
    color: "#8E969F",
    fontFamily: "Chillax-Regular",
  },
  mixed: {
    body: {},
    li: {},
  },
};

export default BriefingExercise;
