import type { NotificationRequest } from "expo-notifications";
import { getAllScheduledNotificationsAsync } from "expo-notifications";

import { api } from "~/context/useTRPC";

export const getReminders = async (user: string): Promise<NotificationRequest[]> => {
  const utils = api.useUtils();

  const reminders = utils.reminders.list.getData({ where: { userId: user } });

  console.log(reminders);

  return getAllScheduledNotificationsAsync();
};
