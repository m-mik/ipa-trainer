/*
  Warnings:

  - You are about to drop the column `partOfSpeech` on the `Word` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wordId,symbols,partOfSpeech]` on the table `Pronunciation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `partOfSpeech` to the `Pronunciation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pronunciation.wordId_symbols_unique";

-- DropIndex
DROP INDEX "Word.name_partOfSpeech_unique";

-- AlterTable
ALTER TABLE "Pronunciation" ADD COLUMN     "partOfSpeech" "PartOfSpeech" NOT NULL;

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "partOfSpeech";

-- CreateIndex
CREATE UNIQUE INDEX "Pronunciation.wordId_symbols_partOfSpeech_unique" ON "Pronunciation"("wordId", "symbols", "partOfSpeech");

-- CreateIndex
CREATE UNIQUE INDEX "Word.name_unique" ON "Word"("name");
