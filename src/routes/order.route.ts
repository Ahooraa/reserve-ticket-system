import { Router, Request, Response, NextFunction } from "express";
import { checkError } from "../middlewares";
import { IAuthRequest } from "../interfaces/auth.interface";
import { tokenAuthentication, adminCheck } from "../middlewares/";
import { OrderController } from "../controllers";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post(
  "/",
  tokenAuthentication,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    orderController.createOrder(req, res, next);
  }
);

orderRouter.patch(
  "/:id/pay",
  tokenAuthentication,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    orderController.payOrder(req, res, next);
  }
);

orderRouter.patch(
  "/:id/cancel",
  tokenAuthentication,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    orderController.cancelOrder(req, res, next);
  }
);

orderRouter.get(
  "/",
  //   tokenAuthentication,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    orderController.getAllOrders(req, res, next);
  }
);
orderRouter.get(
  "/:id",
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    orderController.getOrder(req, res, next);
  }
);

orderRouter.delete(
  "/all",
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    orderController.deleteAllOrderRecords(req, res, next);
  }
);

export default orderRouter;
