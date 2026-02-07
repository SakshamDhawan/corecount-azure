/*
  Warnings:

  - You are about to drop the column `duration` on the `WorkoutsOnProgrammes` table. All the data in the column will be lost.
  - You are about to drop the column `intensity` on the `WorkoutsOnProgrammes` table. All the data in the column will be lost.
  - You are about to drop the column `repetitions` on the `WorkoutsOnProgrammes` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Programme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intensity` to the `Programme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repetitions` to the `Programme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programme" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "intensity" "Intensity" NOT NULL,
ADD COLUMN     "repetitions" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutsOnProgrammes" DROP COLUMN "duration",
DROP COLUMN "intensity",
DROP COLUMN "repetitions";
