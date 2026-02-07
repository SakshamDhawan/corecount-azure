import { Redirect } from "expo-router";

import useAuth from "~/context/useAuth";

export default function Index() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/auth" />;
  } else {
    return <Redirect href={"/dashboard"} />;
  }
}
