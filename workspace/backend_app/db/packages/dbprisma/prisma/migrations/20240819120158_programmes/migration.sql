/*
  Warnings:

  - You are about to drop the column `programmeId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_programmeId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "programmeId";

-- CreateTable
CREATE TABLE "WorkoutsOnProgrammes" (
    "programmeId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "WorkoutsOnProgrammes_pkey" PRIMARY KEY ("programmeId","workoutId")
);

-- AddForeignKey
ALTER TABLE "WorkoutsOnProgrammes" ADD CONSTRAINT "WorkoutsOnProgrammes_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutsOnProgrammes" ADD CONSTRAINT "WorkoutsOnProgrammes_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
