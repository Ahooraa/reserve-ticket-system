import {UserService} from '../services'
import { Request, Response , NextFunction} from "express";

class UserController {
  private userService: UserService;
  constructor(){
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction){
    try {
        const users= await this.userService.getAllUsers();
        return res.json(users);
    } catch (error) {
        next(error);
    }
  }
}
