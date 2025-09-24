import type { Request, Response, NextFunction } from "express";
import { ValidationError, type AnyObjectSchema } from "yup";

export const validateReqBody =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        const errors: Record<string, string> = {};

        /* 
          Fill errors object with specific named error name
          { path: "username",  msg: "some username-error message" },
          { path: "password",  msg: "some password-error message" },
         */
        for (const err of error.inner) {
          if (err.path && !errors[err.path]) {
            errors[err.path] = err.message;
          }
        }

        return res.status(400).render("register", {
          title: "Register",
          errors,
        });
      }

      return next(error);
    }
  };

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/login");
};
