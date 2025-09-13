import e, { Router } from "express";
import type { Request, Response } from "express";

const homeRouter = Router();

homeRouter.get("/", (_req: Request, res: Response) => {
  res.render("home", { title: "Homepage" });
});

export default homeRouter;
