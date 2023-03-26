import { TransactionService, UserService } from "../services";
import { Request, Response, NextFunction } from "express";
import { IAuthRequest } from "../interfaces/auth.interface";

class TransactionController {
  private userService: UserService;
  private transactionService: TransactionService;
  constructor() {
    this.userService = new UserService();
    this.transactionService = new TransactionService();
  }
  async increaseUserBalance(
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;
      const { amount } = req.body;
      const { newBalance, transaction } =
        await this.transactionService.increaseBalance(user, amount);
      return res.status(200).json({
        transation: transaction,
        message: `user ${user.id} balance successfuly increased to ${newBalance}`,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default TransactionController;
