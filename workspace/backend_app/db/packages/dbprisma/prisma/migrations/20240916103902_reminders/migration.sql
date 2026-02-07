-- CreateEnum
CREATE TYPE "ReminderDay" AS ENUM ('MON', 'TUE', 'WED', 'THY', 'FRI', 'SAT', 'SUN');

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT,
    "programmeId" TEXT,
    "days" "ReminderDay"[],

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
