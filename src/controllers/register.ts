import type { NextFunction, Request, Response } from "express";
import { pool } from "../db/pool.js";
import type { User, UserDTO } from "../types/user.js";
import type { QueryResult } from "pg";
import { hashPassword } from "../utils/password.js";

export const generateRegisterView = (_req: Request, res: Response) =>
  res.render("register", { title: "Register", errors: {} });

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const dbRes: QueryResult<User> = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    // User already exists
    if ((dbRes.rowCount ?? 0) > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = hashPassword(password);

    // Create new user
    const insertRes: QueryResult<User> = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at",
      [username, hashedPassword]
    );

    const newUser = insertRes.rows[0];

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const userDTO: UserDTO = {
      id: newUser.id,
      username: newUser.username,
      created_at: newUser.created_at,
    };

    // Call passport to log in the user
    req.logIn(userDTO, (error) => {
      if (error) {
        return next(error);
      }
      res.redirect("/");
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return next(error);
  }
};
