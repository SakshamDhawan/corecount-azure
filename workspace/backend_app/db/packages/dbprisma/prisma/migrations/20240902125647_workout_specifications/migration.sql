/*
  Warnings:

  - Added the required column `hold_1` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hold_2` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hold_3` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkoutLevel" AS ENUM ('BASIC', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Sensors" AS ENUM ('Transversus', 'Rectus', 'Spinal');

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "hold_1" INTEGER NOT NULL,
ADD COLUMN     "hold_2" INTEGER NOT NULL,
ADD COLUMN     "hold_3" INTEGER NOT NULL,
ADD COLUMN     "level" "WorkoutLevel" NOT NULL DEFAULT 'BASIC',
ADD COLUMN     "sensors" "Sensors"[],
ALTER COLUMN "difficulty" SET DEFAULT 'EASY';
