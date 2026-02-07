import { View } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import StyledText, { typography } from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import useBLE from "~/context/useBLE";
import { CALIBRATED_KEY } from "~/services/CalibrationService";

export const CalibrationComplete = () => {
  const { setCalibrated } = useBLE();

  return (
    <View className={"flex gap-y-4"}>
      <StyledText className={"text-center text-light-10"} style={typography.h1}>
        You’re All Set!
      </StyledText>
      <StyledText className={"text-center text-light-10"} style={typography.body.regular}>
        The device calibration is complete. The system now understands your muscle activity levels and is ready to guide
        you through personalized exercises.
      </StyledText>
      <Button
        onPress={() => {
          setCalibrated(true);
          router.replace("/dashboard");
        }}
      >
        Continue
      </Button>
    </View>
  );
};
