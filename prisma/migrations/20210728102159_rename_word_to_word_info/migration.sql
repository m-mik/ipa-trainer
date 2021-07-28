/*
  Warnings:

  - You are about to drop the column `wordId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `wordInfoId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_wordId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "wordId",
ADD COLUMN     "wordInfoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Word";

-- CreateTable
CREATE TABLE "WordInfo" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "ukIpa" TEXT NOT NULL,
    "ukAudio" TEXT NOT NULL,
    "ukIpaAlt" TEXT NOT NULL,
    "usIpa" TEXT NOT NULL,
    "usIpaAlt" TEXT NOT NULL,
    "usAudio" TEXT NOT NULL,
    "partOfSpeech" "PartOfSpeech" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD FOREIGN KEY ("wordInfoId") REFERENCES "WordInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
