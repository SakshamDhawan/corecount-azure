import { Slot } from "expo-router";

import GlobalLayout from "~/components/ui/GlobalLayout";

const Calibration = () => {
  return (
    <GlobalLayout>
      <Slot />
    </GlobalLayout>
  );
};

export default Calibration;
