import type { VideoRef } from "react-native-video";
import { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Video from "react-native-video";

import type { CalibrateSensorProps } from "~/components/calibration/index";
import { Pause, Play } from "~/assets/icons";
import { CalibrationSensor } from "~/components/calibration/index";
import StyledText from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import IconButton from "~/components/ui/IconButton";
import { router } from "expo-router";
import { api } from "~/context/useTRPC";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const CalibrationIntro = ({ ...props }: CalibrateSensorProps) => {
  const videoRef = useRef<VideoRef>(null);
  const [playing, setPlaying] = useState(false);

  const calibratePage = api.articles.list.useQuery({
    slug: "why-calibrate",
  });

  const toggle = () => {
    if (playing) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.resume();
    }

    setPlaying(!playing);
  };

  const getInfo = (phase: CalibrationSensor) => {
    let text = "";
    const vid = videoSource;

    switch (phase) {
      case CalibrationSensor.BASELINE:
        text =
          "1. Sit up straight and keep your shoulders back slightly\n " +
          "2. Look forward and do not slouch\n " +
          "3. Press start and hold this position until the recording is complete";
        break;
      case CalibrationSensor.BACK:
        text =
          "1. Sit up straight, look forwards and do not slouch.\n" +
          "2. Press start and raise both arms in front so that your hands are level with your shoulders.\n" +
          "3. Hold this position until the recording is complete.";
        break;
      case CalibrationSensor.ABDOMINAL:
        text =
          "1. Sit up straight, look forwards and do not slouch.\n" +
          "2. Press start and then push down on your knees as hard as you can. Focus on engaging your abdominals. \n" +
          "3. Hold this position until the recording is complete.";
        break;
    }

    return { text, vid };
  };

  return (
    <View className={"flex gap-y-4"}>
      <View className={"h-64 w-full"}>
        <View className={"max-h-64 w-full items-center"}>
          <Video
            // Can be a URL or a local file.
            source={{
              uri: getInfo(props.sensor).vid,
            }}
            renderToHardwareTextureAndroid={true}
            onEnd={() => {
              setPlaying(false);
              videoRef.current?.seek(0);
              videoRef.current?.pause();
            }}
            onLoad={() => videoRef.current?.seek(0)}
            ref={videoRef}
            paused={true}
            style={styles.backgroundVideo}
          />
          <View
            className={
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full p-4 opacity-80"
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
      <View className={"flex grow"}>
        <StyledText>{getInfo(props.sensor).text}</StyledText>
      </View>

      <Button onPress={() => props.next()}>START</Button>
      {calibratePage.data && (
        <Button
          onPress={() => router.push(`/articles/${calibratePage.data[0].id}`)}
        >
          WHY CALIBRATE
        </Button>
      )}
    </View>
  );
};
const screenW = Dimensions.get("window").width - 70;
const styles = StyleSheet.create({
  backgroundVideo: {
    width: screenW,
    height: (screenW * 9) / 16,
  },
});

export default CalibrationIntro;
