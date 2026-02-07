/*
  Warnings:

  - You are about to drop the `CompletedWorkouts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `intensity` to the `WorkoutsOnProgrammes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompletedWorkouts" DROP CONSTRAINT "CompletedWorkouts_userId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedWorkouts" DROP CONSTRAINT "CompletedWorkouts_workoutId_fkey";

-- AlterTable
ALTER TABLE "WorkoutsOnProgrammes" ADD COLUMN     "intensity" "Difficulty" NOT NULL;

-- DropTable
DROP TABLE "CompletedWorkouts";

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

-- AddForeignKey
ALTER TABLE "CompletedWorkout" ADD CONSTRAINT "CompletedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedWorkout" ADD CONSTRAINT "CompletedWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
