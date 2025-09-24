import { Router } from "express";
import * as registerController from "../controllers/register.js";
import { validateReqBody } from "../middlewares/user.js";
import { userSchema } from "../schemas/user.js";

const registerRouter = Router();  

registerRouter.get("/", registerController.generateRegisterView);
registerRouter.post(
  "/",
  validateReqBody(userSchema),
  registerController.registerUser
);

export default registerRouter;
