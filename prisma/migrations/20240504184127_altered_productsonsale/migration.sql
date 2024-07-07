/*
  Warnings:

  - You are about to drop the `ProductsOnSales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductsOnSales" DROP CONSTRAINT "ProductsOnSales_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnSales" DROP CONSTRAINT "ProductsOnSales_purchaseId_fkey";

-- DropTable
DROP TABLE "ProductsOnSales";

-- CreateTable
CREATE TABLE "productsOnSales" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,

    CONSTRAINT "productsOnSales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productsOnSales_id_key" ON "productsOnSales"("id");

-- AddForeignKey
ALTER TABLE "productsOnSales" ADD CONSTRAINT "productsOnSales_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsOnSales" ADD CONSTRAINT "productsOnSales_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
