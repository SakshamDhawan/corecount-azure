import type { NotificationContentInput, WeeklyTriggerInput } from "expo-notifications";
import { useCallback, useEffect, useState } from "react";
import { Modal, Pressable, Switch, View } from "react-native";
import * as Notifications from "expo-notifications";
import { getAllScheduledNotificationsAsync } from "expo-notifications";
import { router } from "expo-router";
import { MenuView } from "@react-native-menu/menu";

import type { Reminder, ReminderDayType, ReminderWithPartialRelations } from "@corecount/dbprisma/zod";
import { ReminderDaySchema } from "@corecount/dbprisma/zod";
import { colors } from "@corecount/tailwind-config/constants";

import { ChevronLeft, PlusCircle } from "~/assets/icons";
import Check from "~/assets/icons/Check";
import Kebab from "~/assets/icons/Kebab";
import Weight from "~/assets/icons/Weight";
import AddReminderModal from "~/components/AddReminderModal";
import StyledText, { typography } from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import MyCheckbox from "~/components/ui/Checkbox";
import IconButton from "~/components/ui/IconButton";
import PageLayout from "~/components/ui/PageLayout";
import useAuth from "~/context/useAuth";
import { api } from "~/context/useTRPC";

interface ReminderDayCheckProps {
  checked: boolean;
  onChange: () => void;
}

function ReminderDayCheck({ checked, onChange }: ReminderDayCheckProps) {
  return (
    <Pressable
      style={{
        borderColor: checked ? "#fff" : "rgba(255,255,255,0.24)",
      }}
      className={"flex size-6 justify-center rounded-md border"}
      onPress={() => onChange()}
    >
      {checked && <Check stroke={colors.light["30"]} />}
    </Pressable>
  );
}

const Reminders = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useAuth();

  //TODO Make this do something
  const [isEnabled, setIsEnabled] = useState(false);

  //TODO Delete all reminders when toggles, or add them all
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { data: reminders, refetch } = api.reminders.list.useQuery({
    where: { userId: user?.id },
    include: {
      workout: {
        select: {
          title: true,
        },
      },
      programme: {
        select: {
          name: true,
        },
      },
    },
  });

  const editReminderMutation = api.reminders.edit.useMutation();
  const deleteReminderMutation = api.reminders.remove.useMutation();

  useEffect(() => {
    void Notifications.getAllScheduledNotificationsAsync().then(console.log);
  }, []);

  const addReminder = useCallback((data: ReminderWithPartialRelations) => {
    void refetch();

    setModalVisible(false);

    let subtitle = "";
    if (data.workout) {
      subtitle = data.workout.title ?? "";
    }
    if (data.programme) {
      subtitle = data.programme.name ?? "";
    }

    data.days.forEach((day) => {
      const weekday = ((ReminderDaySchema.options.indexOf(day) + 1) % 7) + 1;
      const trigger: WeeklyTriggerInput = {
        weekday,
        repeats: true,
        hour: data.hour,
        minute: data.minute,
      };

      const content: NotificationContentInput = {
        title: "Workout reminder",
        body: "It’s workout time! Let’s keep moving toward your goals.",
        subtitle,
        data: {
          id: data.id,
        },
      };

      void Notifications.scheduleNotificationAsync({
        content,
        trigger,
      });
    });
  }, []);

  function editReminder(reminder: Reminder) {
    console.log("Show modal");
  }

  function deleteReminder(reminder: Reminder) {
    void getAllScheduledNotificationsAsync().then((notifications) => {
      notifications.forEach((notification) => {
        if (notification.content.data.id === reminder.id) {
          void Notifications.cancelScheduledNotificationAsync(notification.identifier);
        }
      });
    });

    void deleteReminderMutation.mutateAsync({ where: { id: reminder.id } }).then(() => refetch());
  }

  function toggleDay(reminder: ReminderWithPartialRelations, option: ReminderDayType) {
    let newDays;
    // Remove!
    if (reminder.days.includes(option)) {
      if (reminder.days.length === 1) {
        console.error("Can't delete the last one yo");
        return;
      }
      newDays = reminder.days.filter((day) => day !== option);
      void Notifications.getAllScheduledNotificationsAsync().then((scheduledNotifications) => {
        scheduledNotifications.forEach((scheduledNotification) => {
          const weekday = ((ReminderDaySchema.options.indexOf(option) + 1) % 7) + 1;

          if (
            scheduledNotification.content.data.id === reminder.id &&
            // @ts-ignore
            scheduledNotification.trigger.weekday === weekday
          ) {
            void Notifications.cancelScheduledNotificationAsync(scheduledNotification.identifier);
          }
        });
      });
    }
    // Add!
    else {
      const weekday = ((ReminderDaySchema.options.indexOf(option) + 1) % 7) + 1;
      const trigger: WeeklyTriggerInput = {
        weekday,
        repeats: true,
        hour: reminder.hour,
        minute: reminder.minute,
      };
      let subtitle = "";
      if (reminder.workout) {
        subtitle = reminder.workout.title ?? "";
      }
      if (reminder.programme) {
        subtitle = reminder.programme.name ?? "";
      }
      const content: NotificationContentInput = {
        title: "Workout reminder",
        body: "Don't forget to do your workout!",
        subtitle,
        data: {
          id: reminder.id,
        },
      };

      void Notifications.scheduleNotificationAsync({
        content,
        trigger,
      });
      newDays = [...reminder.days, option];
    }

    void editReminderMutation
      .mutateAsync({ where: { id: reminder.id }, data: { days: newDays } })
      .then(() => refetch());
  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <AddReminderModal addReminder={addReminder} cancel={() => setModalVisible(false)} />
      </Modal>
      <PageLayout className={"bg-dark-50"}>
        <TitleBar
          iconLeft={<IconButton onPress={() => router.back()} icon={ChevronLeft} shape={"circle"} size={"small"} />}
          iconRight={
            isEnabled && (
              <IconButton onPress={() => setModalVisible(true)} icon={PlusCircle} shape={"circle"} size={"small"} />
            )
          }
        >
          REMINDERS
        </TitleBar>

        <View className={"flex h-20 flex-row items-center bg-dark-70"}>
          <Switch
            trackColor={{ false: colors.dark["90"], true: colors.light["50"] }}
            thumbColor={colors.light["20"]}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            className={"h-10"}
          />
          <StyledText>ENABLE REMINDERS</StyledText>
        </View>

        {reminders?.map((reminder: ReminderWithPartialRelations) => (
          <View key={reminder.id} className={"m-4 rounded-xl"} style={{ backgroundColor: "#111E2B" }}>
            <View className={"flex h-20 flex-row items-center gap-x-4 rounded-t-xl bg-dark-90 p-6"}>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
              <MyCheckbox checked={true} onChange={() => {}} />
              <StyledText className={"grow"}>
                <StyledText style={typography.body.medium}>
                  {reminder.hour}:{reminder.minute}
                </StyledText>
              </StyledText>
              <StyledText className={"right-0"}>
                <MenuView
                  title="Menu Title"
                  onPressAction={({ nativeEvent }) => {
                    switch (nativeEvent.event) {
                      case "edit":
                        editReminder(reminder);
                        break;
                      case "delete":
                        deleteReminder(reminder);
                        break;
                    }
                  }}
                  actions={[
                    {
                      id: "edit",
                      title: "Edit",
                      titleColor: "#2367A2",
                    },
                    {
                      id: "delete",
                      title: "Delete",
                      titleColor: "#2367A2",
                    },
                  ]}
                  shouldOpenOnLongPress={false}
                >
                  <Kebab width={24} height={24} stroke={colors.light["10"]} fill={colors.light["10"]} />
                </MenuView>
              </StyledText>
            </View>
            <View className={"mx-6 my-4"}>
              <View className={"flex flex-row justify-between"}>
                {ReminderDaySchema.options.map((option) => (
                  <View key={reminder.id + option} className={"items-center gap-y-2"}>
                    <StyledText>{option}</StyledText>
                    <ReminderDayCheck
                      checked={reminder.days.includes(option)}
                      onChange={() => {
                        toggleDay(reminder, option);
                      }}
                    />
                  </View>
                ))}
              </View>
              <View className={"my-4 flex flex-row items-center"}>
                <Weight height={24} width={24} stroke={colors.purple} />
                <View>{reminder.workout && <StyledText>{reminder.workout.title}</StyledText>}</View>
                <View>{reminder.programme && <StyledText>{reminder.programme.name}</StyledText>}</View>
              </View>
            </View>
            {/*<StyledText>{JSON.stringify(reminder, null, 2)}</StyledText>*/}
          </View>
        ))}
      </PageLayout>
    </>
  );
};

export default Reminders;
