/*
  Warnings:

  - You are about to drop the column `employee_id` on the `Sale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_employee_id_fkey";

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "employee_id";
