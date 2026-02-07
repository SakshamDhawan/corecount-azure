import { Slot } from "expo-router";

import GlobalLayout from "~/components/ui/GlobalLayout";

const AuthLayout = () => {
  return (
    <GlobalLayout className={"p-4"}>
      <Slot />
    </GlobalLayout>
  );
};

export default AuthLayout;
