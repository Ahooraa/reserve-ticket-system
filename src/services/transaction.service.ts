import { db, User, Order } from "../db";
import { PrismaClient } from "@prisma/client";
import UserService from "./user.service";

class TransactionService {
  private database: PrismaClient;
  private userSerivce: UserService;
  constructor() {
    this.database = db; 
    this.userSerivce = new UserService();
  }

  async increaseBalance(user: User, amount: number) {
    const transType = "INCREASE";
    const newBalance = await this.userSerivce.changeBalance(
      user,
      transType,
      amount
    );
    try {
      const transaction = await this.database.transaction.create({
        data: {
          userId: user.id,
          amount: amount,
          transaction_type: transType,
        },
      });
      return { transaction, newBalance };
    } catch (error) {
      throw new Error("unable to increase balance");
    }
  }
}

export default TransactionService;
