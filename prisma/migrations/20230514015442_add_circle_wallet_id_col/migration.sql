/*
  Warnings:

  - Added the required column `circleWalletId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('USD', 'USDC');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "circleWalletId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserSubscription" ADD COLUMN     "currency" "CurrencyType" NOT NULL;
