/*
  Warnings:

  - The values [THY] on the enum `ReminderDay` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReminderDay_new" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');
ALTER TABLE "Reminder" ALTER COLUMN "days" TYPE "ReminderDay_new"[] USING ("days"::text::"ReminderDay_new"[]);
ALTER TYPE "ReminderDay" RENAME TO "ReminderDay_old";
ALTER TYPE "ReminderDay_new" RENAME TO "ReminderDay";
DROP TYPE "ReminderDay_old";
COMMIT;
