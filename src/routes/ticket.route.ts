import { Router, Request, Response, NextFunction } from "express";
import { checkError } from "../middlewares";
import { IAuthRequest } from "../interfaces/auth.interface";
import { tokenAuthentication ,adminCheck} from "../middlewares/";
import { TicketController } from "../controllers";
import { TicketValidator } from "../middlewares/validators";

const ticketRouter = Router();
const ticketController = new TicketController();
const ticketValidator = new TicketValidator();

ticketRouter.get(
  "/",
  tokenAuthentication,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    ticketController.getAllTickets(req, res, next);
  }
);
ticketRouter.get(
  "/:id",
  tokenAuthentication,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    ticketController.getTicket(req, res, next);
  }
);
//request type should be IAdminRequest
ticketRouter.post(
  "/",
  tokenAuthentication,
  adminCheck,
  ticketValidator.createValidator,
  checkError,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    ticketController.createTicket(req, res, next);
  }
);
//request type should be IAdminRequest`
ticketRouter.patch(
  "/:id",
  tokenAuthentication,
  adminCheck,
  ticketValidator.ticketUpdateValidator,
  checkError,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    ticketController.updateTicket(req, res, next);
  }
);

export default ticketRouter;
