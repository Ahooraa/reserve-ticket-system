import {
  PrismaClient,
  User,
  Ticket,
  Order,
} from "@prisma/client";
const db = new PrismaClient();
export { db, User, Ticket, Order };
