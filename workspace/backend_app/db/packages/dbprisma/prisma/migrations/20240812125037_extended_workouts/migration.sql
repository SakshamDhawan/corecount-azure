/*
  Warnings:

  - Added the required column `difficulty` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'INTERMEDIATE', 'HARD');

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "difficulty" "Difficulty" NOT NULL;
