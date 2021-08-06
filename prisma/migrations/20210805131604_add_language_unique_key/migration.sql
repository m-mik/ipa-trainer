/*
  Warnings:

  - A unique constraint covering the columns `[wordId,symbols,partOfSpeech,language]` on the table `Pronunciation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Pronunciation.wordId_symbols_partOfSpeech_unique";

-- CreateIndex
CREATE UNIQUE INDEX "Pronunciation.wordId_symbols_partOfSpeech_language_unique" ON "Pronunciation"("wordId", "symbols", "partOfSpeech", "language");
