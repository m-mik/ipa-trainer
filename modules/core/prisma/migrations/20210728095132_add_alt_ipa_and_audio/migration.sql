/*
  Warnings:

  - Added the required column `ukAudio` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ukIpaAlt` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usAudio` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usIpaAlt` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "ukAudio" TEXT NOT NULL,
ADD COLUMN     "ukIpaAlt" TEXT NOT NULL,
ADD COLUMN     "usAudio" TEXT NOT NULL,
ADD COLUMN     "usIpaAlt" TEXT NOT NULL;
