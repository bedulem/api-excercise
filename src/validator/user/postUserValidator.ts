import { body } from "express-validator";
import { validatorResponseMiddleware } from "../utils";

export const postUserValidator = [
    body("email").notEmpty().isEmail(),
    body("name").notEmpty().isString().isLength({ min: 2, max: 200 }),
    body("age").notEmpty().isNumeric().isInt({ gt: 12, lt: 121 }),
    body("country").notEmpty().isString().isLength({ min: 2, max: 2 }),
    validatorResponseMiddleware,
];
