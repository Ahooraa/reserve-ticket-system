import { body, check } from "express-validator";

class TransactionValidator {
  increasBalanceValidtor = [
    body("amount")
      .notEmpty()
      .withMessage("amount should not be empty")
      .isFloat()
      .withMessage("amount should be a floating point number"),
  ];
}

export default TransactionValidator;
