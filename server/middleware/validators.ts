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
  body("confirmPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Please enter a valid phone number"),
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
