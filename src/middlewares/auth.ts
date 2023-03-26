import * as jwt from "jsonwebtoken";
import { UserService } from "../services";
import { Request, Response, NextFunction } from "express";
import { IAuthRequest } from "../interfaces/auth.interface";

const userService = new UserService();

const tokenAuthentication = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({
      errorMessage: "token dar header ejbarie!",
    });
  }

  const token = authorization.includes("Bearer")
    ? authorization.split(" ")[1]
    : authorization;

  try {
    const { phone } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userService.getByPhone(phone);
    req.user = user;
    next();
  } catch (error) {
    console.log("error token");
    return res.status(403).json({
      errorMessage: "invalod Token",
    });
  }
};
export { tokenAuthentication };
