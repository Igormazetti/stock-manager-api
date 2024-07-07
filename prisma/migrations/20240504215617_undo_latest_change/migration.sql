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
ALTER TABLE "_ProductToSale" ADD CONSTRAINT "_ProductToSale_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSale" ADD CONSTRAINT "_ProductToSale_B_fkey" FOREIGN KEY ("B") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
