/*
  Warnings:

  - You are about to drop the column `purchase_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_purchase_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "purchase_id";

-- CreateTable
CREATE TABLE "ProductsOnPurchases" (
    "productId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,

    CONSTRAINT "ProductsOnPurchases_pkey" PRIMARY KEY ("productId","purchaseId")
);

-- CreateTable
CREATE TABLE "_ProductToPurchase" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToPurchase_AB_unique" ON "_ProductToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToPurchase_B_index" ON "_ProductToPurchase"("B");

-- AddForeignKey
ALTER TABLE "ProductsOnPurchases" ADD CONSTRAINT "ProductsOnPurchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnPurchases" ADD CONSTRAINT "ProductsOnPurchases_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToPurchase" ADD CONSTRAINT "_ProductToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToPurchase" ADD CONSTRAINT "_ProductToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
