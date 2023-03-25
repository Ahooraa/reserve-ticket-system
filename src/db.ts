import {
  PrismaClient,
  User,
  Ticket,
  Order,
  tickestOnOrders,
} from "@prisma/client";
const db = new PrismaClient();
export { db, User, Ticket, Order, tickestOnOrders };
