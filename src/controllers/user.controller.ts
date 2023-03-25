import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";

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
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.userService.deleteUserById(id);
      return res
        .status(200)
        .end(`user with phone number ${id} deleted successfully`);
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
