/*
  Warnings:

  - You are about to drop the column `discount` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Sale" DROP COLUMN "discount";

-- AlterTable
ALTER TABLE "public"."productsOnSales" ADD COLUMN     "productSaleValue" DOUBLE PRECISION NOT NULL DEFAULT 0;
