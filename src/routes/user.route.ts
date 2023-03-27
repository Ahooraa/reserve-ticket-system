import { Router, Request, Response, NextFunction } from "express";
import { UserController, TransactionController } from "../controllers";
import { checkError } from "../middlewares";
import { IAuthRequest } from "../interfaces/auth.interface";
import { param } from "express-validator";
import { UserValidator, TransactionValidator } from "../middlewares/validators";
import { tokenAuthentication ,adminCheck} from "../middlewares/";

const userRouter = Router();
const userController = new UserController();
const transactionController = new TransactionController();
const userValidator = new UserValidator();
const transactionValidator = new TransactionValidator();

userRouter.post(
  "/auth",
  userValidator.userLoginValidator,
  checkError,
  (req: Request, res: Response, next: NextFunction) => {
    userController.login(req, res, next);
  }
);

userRouter.post(
  "/",
  userValidator.userCreateValidator,
  checkError,
  (req: Request, res: Response, next: NextFunction) => {
    userController.createUser(req, res, next);
  }
);

userRouter.patch(
  "/:id",
  tokenAuthentication,
  userValidator.userUpdateValidator,
  checkError,
  (req: Request, res: Response, next: NextFunction) => {
    userController.updateUser(req, res, next);
  }
);
//request type should be IAdminRequest
userRouter.get(
  "/",
  tokenAuthentication,
  adminCheck,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    userController.getAllUsers(req, res, next);
  }
);
userRouter.get(
  "/wallet",
  tokenAuthentication,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    userController.getBalance(req, res, next);
  }
);
userRouter.post(
  "/wallet",
  tokenAuthentication,
  transactionValidator.increasBalanceValidtor,
  checkError,
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    transactionController.increaseUserBalance(req, res, next);
  }
);

userRouter.get(
  "/:id",
  tokenAuthentication,
  (req: Request, res: Response, next: NextFunction) => {
    userController.getUser(req, res, next);
  }
);

userRouter.delete(
  "/:id/delete",
  tokenAuthentication,
  (req: Request, res: Response, next: NextFunction) => {
    userController.deleteUser(req, res, next);
  }
);
userRouter.get(
  "/check/:phone",
  tokenAuthentication,
  param("phone")
    .isLength({ min: 5, max: 5 })
    .withMessage("phone must be 5 characters"),
  checkError,
  (req: Request, res: Response, next: NextFunction) => {
    userController.userExists(req, res, next);
  }
);

export default userRouter;
