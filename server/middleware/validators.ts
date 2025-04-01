import { body, ValidationChain, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express-serve-static-core";

export const signupValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const validate = (validations: ValidationChain[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.all(validations.map((validation) => validation.run(req)))
      .then(() => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          return next();
        }
        res.status(422).json({ error: result.array() });
      })
      .catch(next);
  };
};
