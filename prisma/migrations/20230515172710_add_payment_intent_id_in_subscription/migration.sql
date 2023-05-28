/*
  Warnings:

  - Added the required column `paymentIntentId` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSubscription" ADD COLUMN     "paymentIntentId" TEXT NOT NULL;
