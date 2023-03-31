import userRouter from "./user.route";
import ticketRouter from "./ticket.route";
import orderRouter from "./order.route";
import { Router, Express } from "express";

function router(app: Router) {
  app.use("/user", userRouter);
  app.use("/ticket", ticketRouter);
  app.use("/order", orderRouter);
}

export default router;
