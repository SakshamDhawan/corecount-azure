import type { ReactNode } from "react";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { router } from "expo-router";

import { Award, Notification, Star, User, Weight } from "~/assets/icons";
import { Action } from "~/components";
import StyledText, { typography } from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import GlobalLayout from "~/components/ui/GlobalLayout";
import useAuth from "~/context/useAuth";
import { api } from "~/context/useTRPC";

interface StatProp {
  icon: ReactNode;
  color: string;
  value: number;
  label: string;
}

const Stat = ({ color, value, label, ...props }: StatProp) => {
  return (
    <View className={"flex flex-col items-center"}>
      <View
        style={{ backgroundColor: color }}
        className={"size-16 items-center justify-center rounded-full bg-purple"}
      >
        {/* @ts-expect-error */}
        <props.icon stroke={"#000"} />
      </View>
      <StyledText
        className={"text-center"}
        style={{
          ...typography.body.large.semibold,
          color: color,
        }}
      >
        {value}
      </StyledText>
      <StyledText style={typography.caption}>{label}</StyledText>
    </View>
  );
};

const Profile = () => {
  const { logout } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useAuth();

  const { data: badges } = api.users.getBadges.useQuery();

  const { data: workouts } = api.completedWorkouts.list.useQuery({
    where: { userId: user?.id },
  });

  // @ts-ignore
  const deleteAccount = () => {
    setModalVisible(true);
  };

  return (
    <GlobalLayout>
      <ScrollView>
        <View className={"flex flex-col gap-8"}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <StyledText style={styles.modalText}>Are you sure?</StyledText>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <StyledText style={styles.textStyle}>Hide Modal</StyledText>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <StyledText style={styles.textStyle}>Hide Modal</StyledText>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View>
            <TitleBar>YOUR PROFILE</TitleBar>
          </View>

          <View className={"flex flex-col items-center"}>
            <View className={"rounded-full"}>
              <Image
                className={"rounded-full border-2 border-white"}
                source={require("../../../assets/dummy/profile.png")}
              />
            </View>
            <StyledText
              style={{ fontWeight: "semibold" }}
              className={"text-white"}
            >
              {user?.name}
            </StyledText>
          </View>
          <View className={"flex flex-row justify-between px-10"}>
            <Stat
              icon={Weight}
              value={workouts?.length ?? 0}
              label={"workouts"}
              color={"#9E7CFF"}
            />
            <Stat icon={Star} value={0} label={"stars"} color={"#FFAE21"} />
            <Pressable onPress={() => router.push("/profile/badges")}>
              {badges && (
                <Stat
                  icon={Award}
                  value={Object.values(badges).reduce(
                    (partialSum, a) => partialSum + a,
                    0,
                  )}
                  label={"badges"}
                  color={"#01CFCC"}
                />
              )}
            </Pressable>
          </View>

          <View className={"flex gap-y-4"}>
            <Action
              icon={Notification}
              onPress={() => router.push("/profile/reminders")}
            >
              Reminders
            </Action>
            {/*<Action icon={User} onPress={() => router.push("/profile/edit")}>*/}
            {/*  Edit Profile*/}
            {/*</Action>*/}
            {/*<Action icon={Lock} onPress={() => router.push("/profile/edit")}>*/}
            {/*  Change Password*/}
            {/*</Action>*/}
            <Action icon={User} onPress={() => router.push("/calibrate")}>
              Calibrate Device
            </Action>
            {/*<Action*/}
            {/*  icon={User}*/}
            {/*  onPress={() => router.push("/calibrate/device")}*/}
            {/*>*/}
            {/*  Device*/}
            {/*</Action>*/}
            {/*<Action icon={PlusCircle} onPress={() => router.push("/profile/edit")}>*/}
            {/*  Get in touch*/}
            {/*</Action>*/}
            {/*<Action icon={Notification} type={"red"} onPress={deleteAccount}>*/}
            {/*  Delete account*/}
            {/*</Action>*/}
            <Action onPress={() => logout()}>Logout</Action>
            <View className={"h-40"}></View>
          </View>
        </View>
      </ScrollView>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Profile;
