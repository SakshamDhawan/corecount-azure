-- AlterTable
ALTER TABLE "CompletedWorkout" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "repetitions" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "duration" SET DEFAULT 0;
