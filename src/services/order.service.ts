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
      return ticketOrder;
    } catch (error) {
      throw new Error(error.message);
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

      let totalTicketOrdersPrice = 0;
      for (const ticketOrderInfo of ticketstoOrder) {
        const ticketOrder = await this.createTicketOrder(
          ticketOrderInfo,
          order
        );
        totalTicketOrdersPrice += ticketOrder.price;
      }
      await this.updateOrder(order.id, { total_price: totalTicketOrdersPrice });
      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateOrder(orderId: string, data): Promise<Order> {
    try {
      const result = await this.database.order.update({
        where: { id: orderId },
        data,
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async submitOrder(orderId: string): Promise<Order> {
    try {
      return await this.updateOrder(orderId, { status: "PAID" });
    } catch (error) {
      throw new Error("unable to submit order");
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
  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.database.order.findMany();
    } catch (error) {
      error.status = 500;
      throw new Error("Unable to fetch orders");
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
