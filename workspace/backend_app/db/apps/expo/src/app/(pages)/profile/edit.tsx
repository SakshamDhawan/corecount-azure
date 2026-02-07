import { View } from "react-native";
import { router } from "expo-router";

import StyledText from "~/components/styled/StyledText";
import Button from "~/components/ui/Button";
import useAuth from "~/context/useAuth";

const EditProfile = () => {
  const { logout } = useAuth();

  return (
    <>
      <View>
        <StyledText>Matt Berry</StyledText>
      </View>
      <View>
        <View></View>
        <View></View>
        <View></View>
      </View>

      <View className={"flex gap-y-4"}>
        <Button onPress={() => router.push("/profile/reminders")}>Reminders</Button>
        <Button onPress={() => logout()}>Logout</Button>
      </View>
    </>
  );
};

export default EditProfile;
