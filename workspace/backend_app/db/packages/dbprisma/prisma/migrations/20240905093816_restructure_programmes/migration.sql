/*
  Warnings:

  - You are about to drop the column `duration` on the `Programme` table. All the data in the column will be lost.
  - You are about to drop the column `intensity` on the `Programme` table. All the data in the column will be lost.
  - You are about to drop the column `repetitions` on the `Programme` table. All the data in the column will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Programme" DROP CONSTRAINT "Programme_userId_fkey";

-- AlterTable
ALTER TABLE "Programme" DROP COLUMN "duration",
DROP COLUMN "intensity",
DROP COLUMN "repetitions",
ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "Exercise";

-- CreateTable
CREATE TABLE "CompletedWorkout" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompletedWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedProgramme" (
    "id" TEXT NOT NULL,
    "programmeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CompletedProgramme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workout_title_key" ON "Workout"("title");

-- AddForeignKey
ALTER TABLE "CompletedWorkout" ADD CONSTRAINT "CompletedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedWorkout" ADD CONSTRAINT "CompletedWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedProgramme" ADD CONSTRAINT "CompletedProgramme_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedProgramme" ADD CONSTRAINT "CompletedProgramme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
