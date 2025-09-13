import type { Request, Response } from "express";
import { pool } from "../db/pool.js";

export const generateRegisterView = (_req: Request, res: Response) =>
  res.render("register", { title: "Register" });

export const registerUser = async (_req: Request, res: Response) => {
  await pool.query("");
};
