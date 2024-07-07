/*
  Warnings:

  - You are about to drop the `_ProductToSale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToSale" DROP CONSTRAINT "_ProductToSale_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSale" DROP CONSTRAINT "_ProductToSale_B_fkey";

-- DropTable
DROP TABLE "_ProductToSale";
