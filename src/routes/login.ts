import { Router } from "express";
import type { Request, Response } from "express";

const loginRouter = Router();

loginRouter.get("/", (_req: Request, res: Response) => {
  res.send("Login Page!");
});

export default loginRouter;
