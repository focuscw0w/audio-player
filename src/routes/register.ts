import { Router } from "express";
import * as registerController from "../controllers/register.js";

const registerRouter = Router();

registerRouter.get("/", registerController.generateRegisterView);
registerRouter.post("/", registerController.registerUser);

export default registerRouter;
