-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "programmeId" TEXT;

-- CreateTable
CREATE TABLE "Programme" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Programme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutsOnProgrammes" (
    "programmeId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "WorkoutsOnProgrammes_pkey" PRIMARY KEY ("programmeId","workoutId")
);

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutsOnProgrammes" ADD CONSTRAINT "WorkoutsOnProgrammes_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutsOnProgrammes" ADD CONSTRAINT "WorkoutsOnProgrammes_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
