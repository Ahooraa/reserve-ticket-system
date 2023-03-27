import userRouter from "./user.route";
import ticketRouter from "./ticket.route";
import { Router, Express } from "express";

function router(app: Router) {
  //should i use Router type or Express for app??
  app.use("/user", userRouter);
  app.use("/ticket", ticketRouter);
}

export default router;
