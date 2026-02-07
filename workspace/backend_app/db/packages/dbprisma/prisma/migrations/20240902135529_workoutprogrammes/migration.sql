/*
  Warnings:

  - Added the required column `duration` to the `WorkoutsOnProgrammes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repetitions` to the `WorkoutsOnProgrammes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutsOnProgrammes" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "repetitions" INTEGER NOT NULL;
