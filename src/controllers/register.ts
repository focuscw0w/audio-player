import type { Request, Response, NextFunction } from "express";
import { pool } from "../db/pool.js";

export const generateRegisterView = (_req: Request, res: Response) =>
  res.render("register", { title: "Register" });

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password);

  return res.status(201).json({ message: "User registered successfully" });
};
