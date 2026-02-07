/*
  Warnings:

  - Added the required column `duration` to the `CompletedProgramme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intensity` to the `CompletedProgramme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repetitions` to the `CompletedProgramme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompletedProgramme" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "intensity" "Intensity" NOT NULL,
ADD COLUMN     "repetitions" INTEGER NOT NULL;
