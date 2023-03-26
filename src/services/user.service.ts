import { db, User, Order } from "../db";
import { PrismaClient } from "@prisma/client";

class UserService {
  private database: PrismaClient;
  constructor() {
    this.database = db;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.database.user.findMany();
    } catch (error) {
      error.status = 500;
      throw new Error("Unable to fetch users");
    }
  }
  async getById(id: string): Promise<User> {
    try {
      return await this.database.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error("Unable to fetch user");
    }
  }
  async getByPhone(phone: string): Promise<User> {
    try {
      return await this.database.user.findUnique({
        where: { phone },
      });
    } catch (error) {
      throw new Error("Unable to fetch user");
    }
  }
  async userExists(phone: string): Promise<Boolean> {
    try {
      const user = await this.database.user.findUnique({ where: { phone } });
      if (!user) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(data) {
    try {
      const user = await this.database.user.create({
        data,
      });
      return user.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(id, data) {
    try {
      const result = await this.database.user.update({
        where: { id },
        data,
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUserById(id: string): Promise<void> {
    try {
      await this.database.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Unable to delete user");
    }
  }

  async changeBalance(
    user: User,
    transactionType: String,
    amount: number
  ): Promise<number> {
    try {
      let newBalance;
      if (transactionType === "INCREASE") {
        newBalance = user.balance + amount;
      } else if (transactionType === "DECREASE") {
        if (user.balance < amount) {
          throw new Error("sorry, user balance is not enough");
        }
        newBalance = user.balance - amount;
      }
      const updatedUser = await this.database.user.update({
        where: { id: user.id },
        data: { balance: newBalance },
      });
      return updatedUser.balance;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
