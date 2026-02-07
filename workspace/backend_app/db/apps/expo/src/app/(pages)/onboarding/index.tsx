import * as React from "react";
import { SafeAreaView } from "react-native";
import { router } from "expo-router";

import { ChevronLeft } from "~/assets/icons";
import TitleBar from "~/components/Title";
import IconButton from "~/components/ui/IconButton";

const Onboarding = () => {
  return (
    <SafeAreaView>
      <TitleBar
        iconLeft={<IconButton onPress={() => router.back()} shape={"circle"} size={"small"} icon={ChevronLeft} />}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
