import { db, User, Order } from "../db";
import { PrismaClient } from "@prisma/client";

class TransactionService {
  private database: PrismaClient;
  constructor() {
    this.database = db;
  }

  async increaseBalance(user: User, amount: number) {
    try {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: { balance: user.balance + amount },
      });
    } catch (error) {
      throw new Error("unable to increase balance");
    }
  }
}
