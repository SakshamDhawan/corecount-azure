/*
  Warnings:

  - You are about to drop the `WorkoutsOnProgrammes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkoutsOnProgrammes" DROP CONSTRAINT "WorkoutsOnProgrammes_programmeId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutsOnProgrammes" DROP CONSTRAINT "WorkoutsOnProgrammes_workoutId_fkey";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "programmeId" TEXT;

-- DropTable
DROP TABLE "WorkoutsOnProgrammes";

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
