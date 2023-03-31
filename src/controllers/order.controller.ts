import { Request, Response, NextFunction } from "express";
import { pick } from "lodash";
import { IAuthRequest } from "../interfaces/auth.interface";
import { OrderService, UserService, TicketService } from "../services";
import TicketOrder from "../interfaces/ticketOrder.type";

class OrderController {
  private orderService: OrderService;
  private ticketService: TicketService;
  private userService: UserService;
  constructor() {
    this.orderService = new OrderService();
    this.userService = new UserService();
    this.ticketService = new TicketService();
  }

  async createOrder(req: IAuthRequest, res: Response, next: NextFunction) {
    const user = req.user;
    const { ticketOrdersInfoList } = req.body; //includes a list of objects like this : {ticketId, count}

    const ticketsToOrderList: TicketOrder[] = []; //includes a list of objects like this : {ticket:Ticket, count: number}
    for (const ticketOrderInfo of ticketOrdersInfoList) {
      const ticket = await this.ticketService.getById(ticketOrderInfo.ticketId);
      if (!ticket) {
        return res.status(404).json({
          error: true,
          message: ` a ticket with ID ${ticketOrderInfo.ticketId} doesn't exist`,
        });
      } else {
        ticketsToOrderList.push({ ticket, count: ticketOrderInfo.count });
      }
    }

    const order = await this.orderService.createOrder(
      user.id,
      ticketsToOrderList
    );
    return res.status(200).json({
      message: `an order with ID ${order} has been created`,
      order: await this.orderService.getOrderById(order.id),
    });
  }
  async deleteAllOrderRecords(
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.orderService.deleteManyOrderRecords();
      return res.status(204).json({
        messaage: "all order and ticketOnOrder records have been deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
