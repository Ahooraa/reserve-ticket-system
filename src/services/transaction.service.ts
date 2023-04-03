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

  async increaseBalance(user: User, amount: number, orderId?: string) {
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
          orderId: orderId,
        },
      });
      return { transaction, newBalance };
    } catch (error) {
      throw new Error("unable to increase balance");
    }
  }

  async decreaseBalance(user: User, amount: number, orderId: string) {
    const transType = "DECREASE";
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
          orderId: orderId,
        },
      });
      return { transaction, newBalance };
    } catch (error) {
      throw new Error("unable to decrease balance");
    }
  }
}

export default TransactionService;
