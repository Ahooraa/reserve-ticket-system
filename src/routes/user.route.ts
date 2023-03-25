import { Router } from "express";
import { UserController } from "../controllers";
import { body, validationResult } from "express-validator";
import { checkError } from "../middlewares";
// import{userValidator} from '../validators'
// import {tokenAuthentication, adminCheck} from '../middlewares/auth'

const userRouter = Router();
const userController = new UserController();

// userRouter.use('/user', )
userRouter.get("/", userController.getAllUsers);

export default userRouter;
