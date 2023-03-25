import { PrismaClient, User, Ticket, ticketOrder } from "@prisma/client";
const db = new PrismaClient();
export { db, User, Ticket, ticketOrder };
