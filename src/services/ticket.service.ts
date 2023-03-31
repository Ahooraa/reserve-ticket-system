import { errorMonitor } from "events";
import { db, Ticket } from "../db";
import { PrismaClient } from "@prisma/client";

class TicketService {
  private database: PrismaClient;
  constructor() {
    this.database = db;
  }

  async create(data) {
    try {
      const ticket = await this.database.ticket.create({
        data,
      });
      return ticket.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateTicket(id, data) {
    try {
      const result = await this.database.ticket.update({
        where: { id },
        data,
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteTicketById(id: string) {
    try {
      return await this.database.ticket.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Unable to delete ticket");
    }
  }
  async deleteManyTickets(ticketIds: Array<string>) {
    try {
      return await this.database.ticket.deleteMany({
        where: {
          id: {
            in: ticketIds,
          },
        },
      });
    } catch (error) {
      throw new Error("unable to delete tickets");
    }
  }
  async getById(id: string): Promise<Ticket> {
    try {
      return await this.database.ticket.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error("Unable to fetch ticket");
    }
  }
  async getAllTickets(): Promise<Ticket[]> {
    try {
      return await this.database.ticket.findMany();
    } catch (error) {
      error.status = 500;
      throw new Error("Unable to fetch tickets");
    }
  }

  async ticketExists(ticketId: string): Promise<Boolean> {
    try {
      const ticket = await this.database.ticket.findUnique({
        where: { id: ticketId },
      });
      if (!ticket) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
}

export default TicketService;
