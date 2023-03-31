import { log } from "console";
import { db, User, Ticket, Order, OrderOnTickets } from "../db";
import TicketOrder from "../interfaces/ticketOrder.type";
import { PrismaClient } from "@prisma/client";
import { TicketService } from "../services";
class OrderService {
  private database: PrismaClient;
  private ticketService: TicketService;
  constructor() {
    this.database = db;
    this.ticketService = new TicketService();
  }
  async increaseOrderTotalPrice(order: Order, amount: number): Promise<Order> {
    console.log(order);
    console.log(order.total_price);
    console.log(amount);

    return await this.database.order.update({
      where: {
        id: order.id,
      },
      data: {
        total_price: order.total_price + amount,
      },
    });
  }

  async createTicketOrder(
    ticketOrderInfo: TicketOrder,
    order: Order
  ): Promise<OrderOnTickets> {
    try {
      const { ticket, count } = ticketOrderInfo;

      if (count > ticket.stock) {
        throw new Error(
          "ticket count you want to order must be less than stock"
        );
      }
      await this.ticketService.updateTicket(ticket.id, {
        stock: ticket.stock - count,
      });

      const ticketOrder = await this.database.orderOnTickets.create({
        data: {
          ticketId: ticket.id,
          orderId: order.id,
          count,
          price: count * ticket.unit_price,
        },
      });

      // console.log(order)
      const updatedOrder = await this.increaseOrderTotalPrice(
        order,
        ticketOrder.price
      );
      return ticketOrder;
    } catch (error) {
      throw new Error("Unable to create ticket order");
    }
  }

  async createOrder(
    userId: string,
    ticketstoOrder: TicketOrder[]
  ): Promise<Order> {
    try {
      const order = await this.database.order.create({
        data: {
          userId,
          total_price: 0,
          status: "RESERVED",
        },
      });

      for (const ticketOrderInfo of ticketstoOrder) {
        await this.createTicketOrder(ticketOrderInfo, order);
      }
      return order;
    } catch (error) {
      throw new Error("unable to create order");
    }
  }
  async getOrderById(orderId: string): Promise<Order> {
    try {
      return await this.database.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          tickets: true,
        },
      });
    } catch (error) {
      throw new Error("Unable to fetch order");
    }
  }
  async deleteManyOrderRecords() {
    try {
      await this.database.orderOnTickets.deleteMany({});
      await this.database.order.deleteMany({});
    } catch (error) {
      throw new Error("unable to delete all order and ticketOnOrder records");
    }
  }
}

export default OrderService;
