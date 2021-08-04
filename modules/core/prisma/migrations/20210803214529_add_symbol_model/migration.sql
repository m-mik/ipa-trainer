/*
  Warnings:

  - You are about to drop the column `wordInfoId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `WordInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `wordId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_wordInfoId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "wordInfoId",
ADD COLUMN     "wordId" TEXT NOT NULL;

-- DropTable
DROP TABLE "WordInfo";

-- CreateTable
CREATE TABLE "Symbol" (
    "id" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "partOfSpeech" "PartOfSpeech" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word.value_partOfSpeech_unique" ON "Word"("value", "partOfSpeech");

-- AddForeignKey
ALTER TABLE "Symbol" ADD FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
