import { Router,Request, Response, NextFunction } from "express";
import { UserController } from "../controllers";
import { UserService } from "../services";
import { body, validationResult } from "express-validator";
import { checkError } from "../middlewares";
// import{userValidator} from '../validators'
// import {tokenAuthentication, adminCheck} from '../middlewares/auth'

const userRouter = Router();
const userController = new UserController();

// userRouter.use('/user', )
userRouter.get("/", (req:Request, res:Response, next:NextFunction) => {
    userController.getAllUsers(req, res, next)
});

userRouter.get("/:id", (req:Request, res:Response, next:NextFunction) => {
    userController.getUser(req, res, next)
})

userRouter.delete("/:id", (req:Request, res:Response, next:NextFunction) => {
    userController.deleteUser(req, res, next)
})
export default userRouter;
