/*
  Warnings:

  - You are about to drop the column `programmeId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `WorkoutsOnProgrammes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_programmeId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutsOnProgrammes" DROP CONSTRAINT "WorkoutsOnProgrammes_programmeId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutsOnProgrammes" DROP CONSTRAINT "WorkoutsOnProgrammes_workoutId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "programmeId";

-- DropTable
DROP TABLE "WorkoutsOnProgrammes";

-- CreateTable
CREATE TABLE "_ProgrammeToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProgrammeToWorkout_AB_unique" ON "_ProgrammeToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_ProgrammeToWorkout_B_index" ON "_ProgrammeToWorkout"("B");

-- AddForeignKey
ALTER TABLE "_ProgrammeToWorkout" ADD CONSTRAINT "_ProgrammeToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgrammeToWorkout" ADD CONSTRAINT "_ProgrammeToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
