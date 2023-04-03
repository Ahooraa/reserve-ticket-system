import { Request, Response, NextFunction } from "express";
import { pick } from "lodash";
import { IAuthRequest } from "../interfaces/auth.interface";
import {
  OrderService,
  UserService,
  TicketService,
  TransactionService,
} from "../services";
import TicketOrder from "../interfaces/ticketOrder.type";

class OrderController {
  private orderService: OrderService;
  private ticketService: TicketService;
  private transactionService: TransactionService;
  private userService: UserService;
  constructor() {
    this.orderService = new OrderService();
    this.userService = new UserService();
    this.ticketService = new TicketService();
    this.transactionService = new TransactionService();
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
    console.log(user.id);

    const order = await this.orderService.createOrder(
      user.id,
      ticketsToOrderList
    );
    return res.status(200).json({
      message: `an order with ID ${order.id} has been created`,
      order: await this.orderService.getOrderById(order.id),
    });
  }

  async updateOrder(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const allowedFields = ["status", "total_price"];
      const filteredBody = pick(req.body, allowedFields);
      const { id } = req.params;
      const result = await this.orderService.updateOrder(id, filteredBody);
      return res.status(200).json({
        result: result,
        message: `order with id: ${id} updated successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  async payOrder(
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const user = req.user;
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);
      const paidTransaction = await this.transactionService.decreaseBalance(
        user,
        order.total_price,
        order.id
      );
      if (!paidTransaction) {
        throw new Error("faild to pay order");
      } else {
        const paidOrder = await this.orderService.submitOrder(id);
        return res.status(200).json({
          message: `order with id: ${id} was paid by user: ${user.id}`,
          order: paidOrder,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const user=req.user;
      const {id} = req.params
      const order = await this.orderService.getOrderById(id);
      const deletedTicketOrders = await this.orderService.deleteAllTicketOrdersOfAnOrder(order.id)

      const returnMoneyTransaction = await this.transactionService.increaseBalance(user,order.total_price, order.id);
      if(!returnMoneyTransaction){
        throw new Error("failed to return money of canceled order")
      }else{
        const canceledOrder=await this.orderService.updateOrder(id,{status: "CANCELED"} )
        return res.status(202).json({
          message: `user with id: ${user.id} canceled order : ${canceledOrder.id}`,
          canceledOrder,
          deletedTicketOrders
        })

      }

      
    }
     catch (error) {
      next(error)
     }
  }
  async getOrder(
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);
      if (!order) {
        throw new Error("Ticket not found");
      }
      return res.json(order);
    } catch (error) {
      next(error);
    }
  }
  async getAllOrders(
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const orders = await this.orderService.getAllOrders();
      return res.json(orders);
    } catch (error) {
      next(error);
    }
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
