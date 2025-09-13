import type { Request, Response, NextFunction } from "express";
import type { AnyObjectSchema } from "yup";

export const validateReqBody =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  };
