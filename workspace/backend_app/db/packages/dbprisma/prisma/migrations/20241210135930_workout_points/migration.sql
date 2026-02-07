/*
  Warnings:

  - You are about to drop the column `comments` on the `CompletedWorkout` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `CompletedWorkout` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `CompletedWorkout` table. All the data in the column will be lost.
  - You are about to drop the column `repetitions` on the `CompletedWorkout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompletedWorkout" DROP COLUMN "comments",
DROP COLUMN "duration",
DROP COLUMN "rating",
DROP COLUMN "repetitions",
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;
