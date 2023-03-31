import {
  PrismaClient,
  User,
  Ticket,
  Order,
  OrderOnTickets,
} from "@prisma/client";
const db = new PrismaClient();
export { db, User, Ticket, Order, OrderOnTickets };
