/*
  Warnings:

  - You are about to drop the column `duration` on the `CompletedProgramme` table. All the data in the column will be lost.
  - You are about to drop the column `intensity` on the `CompletedProgramme` table. All the data in the column will be lost.
  - You are about to drop the column `repetitions` on the `CompletedProgramme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompletedProgramme" DROP COLUMN "duration",
DROP COLUMN "intensity",
DROP COLUMN "repetitions",
ADD COLUMN     "strength" INTEGER NOT NULL DEFAULT 1;
