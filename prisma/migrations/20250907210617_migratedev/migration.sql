-- AlterTable
ALTER TABLE "public"."_ProductToSale" ADD CONSTRAINT "_ProductToSale_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_ProductToSale_AB_unique";
