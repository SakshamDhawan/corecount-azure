/*
  Warnings:

  - Added the required column `hour` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minute` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "hour" INTEGER NOT NULL,
ADD COLUMN     "minute" INTEGER NOT NULL;
