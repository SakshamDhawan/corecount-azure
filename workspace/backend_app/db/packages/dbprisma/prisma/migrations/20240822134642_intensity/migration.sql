/*
  Warnings:

  - Changed the type of `intensity` on the `WorkoutsOnProgrammes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WorkoutsOnProgrammes" DROP COLUMN "intensity",
ADD COLUMN     "intensity" "Intensity" NOT NULL;
