/*
  Warnings:

  - You are about to drop the `_ProgrammeToWorkout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProgrammeToWorkout" DROP CONSTRAINT "_ProgrammeToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProgrammeToWorkout" DROP CONSTRAINT "_ProgrammeToWorkout_B_fkey";

-- DropTable
DROP TABLE "_ProgrammeToWorkout";

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
