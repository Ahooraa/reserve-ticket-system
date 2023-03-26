import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { pick } from "lodash";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IAuthRequest } from "../interfaces/auth.interface";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, password } = req.body;
      const user = await this.userService.getByPhone(phone);
      if (!user) {
        return res.status(403).json({ message: "invalid credentials" });
      }

      const validPass =
        (await bcrypt.compare(password, user.password)) ||
        user.password === password;
      if (!validPass) {
        return res.status(403).json({ message: "invalid credentials" });
      }
      const token = jwt.sign({ phone: user.phone }, process.env.SECRET_KEY, {
        expiresIn: Number(process.env.TOKEN_EXPIRE_TIME),
      });
      return res.json({
        message: "succuessfully signed in",
        access_token: token,
      });
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }

  async getAllUsers(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
  async getUser(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.getById(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async userExists(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const { phone } = req.params;
      if (await this.userService.userExists(phone)) {
        return res.status(200).send("this user exists");
      } else {
        return res.status(404).send("user not found");
      }
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userId = await this.userService.createUser({
        ...req.body,
        password: hashedPassword,
      });
      return res.status(201).send({
        userId,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const allowedFields = [
        "fname",
        "lname",
        "birthday",
        "password",
        "avatar_url",
      ];
      const filteredBody = pick(req.body, allowedFields);
      const { id } = req.params;
      const result = await this.userService.updateUser(id, filteredBody);
      return res.status(200).json({
        result: result,
        message: `user with id: ${id} updated successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.userService.deleteUserById(id);
      return res.status(200).end(`user with id: ${id} deleted successfully`);
    } catch (error) {
      next(error);
    }
  }

  async getBalance(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      console.log(user.fname);
      return res
        .status(200)
        .send(`user ${user.fname} balance :  ${user.balance}`);
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
