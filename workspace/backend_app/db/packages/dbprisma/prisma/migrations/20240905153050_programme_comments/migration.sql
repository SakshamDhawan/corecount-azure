-- AlterTable
ALTER TABLE "CompletedProgramme" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "CompletedWorkout" ADD COLUMN     "completedProgrammeId" TEXT;

-- AddForeignKey
ALTER TABLE "CompletedWorkout" ADD CONSTRAINT "CompletedWorkout_completedProgrammeId_fkey" FOREIGN KEY ("completedProgrammeId") REFERENCES "CompletedProgramme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
