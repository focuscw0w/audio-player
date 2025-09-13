import { Router } from "express";
import * as loginController from "../controllers/login.js";

const loginRouter = Router();

loginRouter.get("/", loginController.generateLoginView);

export default loginRouter;
