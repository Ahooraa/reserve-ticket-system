/*
  Warnings:

  - You are about to drop the `tickestOnOrders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ticketId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickestOnOrders" DROP CONSTRAINT "tickestOnOrders_orderId_fkey";

-- DropForeignKey
ALTER TABLE "tickestOnOrders" DROP CONSTRAINT "tickestOnOrders_ticketId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "ticketId" TEXT NOT NULL;

-- DropTable
DROP TABLE "tickestOnOrders";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
