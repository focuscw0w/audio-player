import type { Request, Response } from "express";

export const generateHomeView = (_req: Request, res: Response) =>
  res.render("home", { title: "Login" });
