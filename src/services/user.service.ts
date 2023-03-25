import { db, User, Order, tickestOnOrders } from "../db";
import { PrismaClient } from "@prisma/client";

class UserService {
    private db: PrismaClient;
  constructor() {
    this.db = db;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      console.log("in user service");
      
      return await this.db.user.findMany();
    } catch (error) {
      error.status=500
      throw new Error("Unable to fetch users");
    }
  }
}

export default UserService;
