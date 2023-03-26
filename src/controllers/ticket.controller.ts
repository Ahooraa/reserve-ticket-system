import { TicketService } from "../services";
import { Request, Response, NextFunction } from "express";
import { pick } from "lodash";
import { IAuthRequest } from "../interfaces/auth.interface";

class TicketController {
  private ticketService: TicketService;
  constructor() {
    this.ticketService = new TicketService();
  }

  async getAllTickets(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const tickets = await this.ticketService.getAllTickets();
      return res.json(tickets);
    } catch (error) {
      next(error);
    }
  }
  async getTicket(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const ticket = await this.ticketService.getById(id);
      return res.json(ticket);
    } catch (error) {
      next(error);
    }
  }
  //request type should be IAdminRequest
  async createTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketId = await this.ticketService.create({
        ...req.body,
      });
      return res.status(201).send({
        ticketId,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.ticketService.deleteTicketById(id);
      return res.status(200).end(`ticket with id: ${id} deleted successfully`);
    } catch (error) {
      next(error);
    }
  }
  async deleteManyTickets(req: Request, res: Response, next: NextFunction) {}
}

export default TicketController;
