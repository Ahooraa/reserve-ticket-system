import { db, User, Order, tickestOnOrders } from "../db";
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
  

  async createUser(){

  }
  async deleteUserById(id: string): Promise<void> {
    try {
      await db.user.delete({
        where: {id},
      });
    } catch (error) {
      throw new Error("Unable to delete user");
    }
  }
}

export default UserService;
