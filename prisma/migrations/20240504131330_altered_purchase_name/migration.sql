/*
  Warnings:

  - You are about to drop the `ProductsOnPurchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToPurchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductsOnPurchases" DROP CONSTRAINT "ProductsOnPurchases_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnPurchases" DROP CONSTRAINT "ProductsOnPurchases_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_company_id_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToPurchase" DROP CONSTRAINT "_ProductToPurchase_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToPurchase" DROP CONSTRAINT "_ProductToPurchase_B_fkey";

-- DropTable
DROP TABLE "ProductsOnPurchases";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "_ProductToPurchase";

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsOnSales" (
    "productId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,

    CONSTRAINT "ProductsOnSales_pkey" PRIMARY KEY ("productId","purchaseId")
);

-- CreateTable
CREATE TABLE "_ProductToSale" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSale_AB_unique" ON "_ProductToSale"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSale_B_index" ON "_ProductToSale"("B");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnSales" ADD CONSTRAINT "ProductsOnSales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnSales" ADD CONSTRAINT "ProductsOnSales_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSale" ADD CONSTRAINT "_ProductToSale_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSale" ADD CONSTRAINT "_ProductToSale_B_fkey" FOREIGN KEY ("B") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
