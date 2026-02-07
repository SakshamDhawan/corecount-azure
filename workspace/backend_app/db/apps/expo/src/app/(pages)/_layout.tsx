import { Slot } from "expo-router";

import PageLayout from "~/components/ui/PageLayout";

const AuthLayout = () => {
  return (
    <PageLayout>
      <Slot />
    </PageLayout>
  );
};

export default AuthLayout;
