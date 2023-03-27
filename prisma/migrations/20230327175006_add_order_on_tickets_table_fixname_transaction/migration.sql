/*
  Warnings:

  - You are about to drop the column `count` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_orderId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "count",
DROP COLUMN "ticketId";

-- DropTable
DROP TABLE "transaction";

-- CreateTable
CREATE TABLE "OrderOnTickets" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderOnTickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transaction_type" "TransationType" NOT NULL,
    "orderId" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderOnTickets" ADD CONSTRAINT "OrderOnTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderOnTickets" ADD CONSTRAINT "OrderOnTickets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
