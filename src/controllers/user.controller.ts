import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import {pick} from 'lodash'
import * as bcrypt from "bcrypt";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.getById(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async userExists(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone } = req.params;
      if (this.userService.userExists(phone)) {
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

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const allowedFields=["fname","lname","birthday","password", "avatar_url"]
      const filteredBody = pick(req.body, allowedFields);
      const { id } = req.params;
      const result = await this.userService.updateUser(id, filteredBody);
      return res.status(200).json({
        result:result,
        message:`user with id: ${id} updated successfully`
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.userService.deleteUserById(id);
      return res.status(200).end(`user with id: ${id} deleted successfully`);
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
