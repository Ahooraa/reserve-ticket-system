import { body, check } from "express-validator";
import { db } from "../../db";
import { UserService } from "../../services";
import { promises } from "dns";

const userService = new UserService();

const userCreateValidator = [
  body("fname", "lname")
    .notEmpty()
    .withMessage("fname or lname is required")
    .isString()
    .isLength({ min: 4 })
    .withMessage("at least 4 characters required"),
  check("phone")
    .notEmpty()
    .withMessage("phone is required")
    .isString()
    .isLength({ min: 5, max: 5 })
    .withMessage("phone must be 5 characters")
    .custom(async (phone) => {
      try {
        const userExists = await userService.userExists(phone);
        if (userExists) {
          return Promise.reject("this user already exists");
        }
        return phone;
      } catch (error) {
        return Promise.reject(error.message);
      }
    }),
  body("birthday").notEmpty().withMessage("birthday is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  body("avatar_url").optional({ nullable: true }),
  body("role").optional({ nullable: true }),
];

export { userCreateValidator };