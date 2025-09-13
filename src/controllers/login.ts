import type { Request, Response } from "express";

export const generateLoginView = (_req: Request, res: Response) =>
  res.render("login", { title: "Login" });
