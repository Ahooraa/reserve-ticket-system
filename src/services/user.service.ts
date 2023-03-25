import { db, User,ticketOrder } from "../db";
import IUser from "../interfaces/user.interface";
// import { PrismaClient } from "@prisma/client";

class UserService {
//   private db: PrismaClient;
  constructor() {
    // this.db = db;
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      return await db.user.findMany()
    } catch (error) {
        throw new Error(error.message)
    }
  }
}

export default UserService;
