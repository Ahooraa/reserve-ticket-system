import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers";
import { UserService } from "../services";
import { body, validationResult } from "express-validator";
import { checkError } from "../middlewares";
// import{userValidator} from '../validators'
import { userCreateValidator } from "../middlewares/validators/user.validator";
// import {tokenAuthentication, adminCheck} from '../middlewares/auth'

const userRouter = Router();
const userController = new UserController();

// userRouter.use('/user', )
userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  userController.getAllUsers(req, res, next);
});

userRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  userController.getUser(req, res, next);
});

userRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  userController.deleteUser(req, res, next);
});

userRouter.head(
  "/:phone",
  (req: Request, res: Response, next: NextFunction) => {
    userController.userExists(req, res, next);
  }
);

userRouter.post("/", userCreateValidator,(req: Request, res: Response, next: NextFunction) => {
  userController.createUser(req, res, next);
});

export default userRouter;
