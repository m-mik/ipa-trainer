/*
  Warnings:

  - You are about to drop the column `partOfSpeech` on the `Pronunciation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wordId,symbols,language]` on the table `Pronunciation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,partOfSpeech]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `partOfSpeech` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pronunciation.wordId_symbols_partOfSpeech_language_unique";

-- AlterTable
ALTER TABLE "Pronunciation" DROP COLUMN "partOfSpeech";

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "partOfSpeech" "PartOfSpeech" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pronunciation.wordId_symbols_language_unique" ON "Pronunciation"("wordId", "symbols", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Word.name_partOfSpeech_unique" ON "Word"("name", "partOfSpeech");
