import { body, check } from "express-validator";

class TicketValidator {
  createValidator = [
    body("from_location")
      .notEmpty()
      .withMessage("from location must be specified")
      .isString(),
    body("to_location")
      .notEmpty()
      .withMessage("to location must be specified")
      .isString(),

    body("departure_date")
      .notEmpty()
      .withMessage("departure date must be provided")
      .isISO8601()
      .withMessage("departure date must have ISO8601 date format"),
    body("arrival_date")
      .notEmpty()
      .withMessage("arrival date must be provided")
      .isISO8601()
      .withMessage("arrival date must have ISO8601 date format"),

    body("unit_price")
      .notEmpty()
      .withMessage("unit price must be provided")
      .isFloat()
      .withMessage("unit price must have float format"),

    body("stock")
      .notEmpty()
      .withMessage("stock must be provided")
      .isInt()
      .withMessage("stock must have integer format"),
  ];

  ticketUpdateValidator = [
    body("from_location").optional({ nullable: true }).isString(),
    body("to_location").optional({ nullable: true }).isString(),
    body("departure_date")
      .optional({ nullable: true })
      .isISO8601()
      .withMessage("departure date must have ISO8601 date format"),
    body("arrival_date")
      .optional({ nullable: true })
      .isISO8601()
      .withMessage("arrival date must have ISO8601 date format"),
    body("unit_price")
      .optional({ nullable: true })
      .isFloat()
      .withMessage("unit price must have float format"),
    body("stock")
      .optional({ nullable: true })
      .isInt()
      .withMessage("stock must have Integer format"),
  ];
}

export default TicketValidator;
