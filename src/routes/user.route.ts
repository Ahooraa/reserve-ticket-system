import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers";
import { checkError } from "../middlewares";
// import{userValidator} from '../validators'
import {
  userCreateValidator,
  userLoginValidator,
  userUpdateValidator,
} from "../middlewares/validators/user.validator";
import { tokenAuthentication } from "../middlewares/auth";

const userRouter = Router();
const userController = new UserController();

// userRouter.use('/user', )
userRouter.post(
  "/auth",
  userLoginValidator,
  checkError,
  (req: Request, res: Response, next: NextFunction) => {
    userController.login(req, res, next);
  }
);

userRouter.post(
  "/",
  userCreateValidator,
  checkError,
  (req: Request, res: Response, next: NextFunction) => {
    userController.createUser(req, res, next);
  }
);
userRouter.patch(
  "/:id",
  userUpdateValidator,
  checkError,
  (req: Request, res: Response, next: NextFunction) => {
    userController.updateUser(req, res, next);
  }
);

userRouter.get(
  "/",
  tokenAuthentication,
  (req: Request, res: Response, next: NextFunction) => {
    userController.getAllUsers(req, res, next);
  }
);

userRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  userController.getUser(req, res, next);
});

userRouter.delete(
  "/:id/delete",
  (req: Request, res: Response, next: NextFunction) => {
    userController.deleteUser(req, res, next);
  }
);
// in kar nemikone !!!
userRouter.head(
  "/:phone",
  (req: Request, res: Response, next: NextFunction) => {
    userController.userExists(req, res, next);
  }
);

export default userRouter;
