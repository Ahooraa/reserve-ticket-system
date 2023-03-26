import { body, check } from "express-validator";

const increasBalanceValidtor = [
  body("amount")
    .notEmpty()
    .withMessage("amount should not be empty")
    .isFloat()
    .withMessage("amount should be a floating point number"),
];

export { increasBalanceValidtor };
