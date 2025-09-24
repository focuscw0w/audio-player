import { Router } from "express";
import * as homeController from "../controllers/home.js";
import { isAuthenticated } from "../middlewares/user.js";

const homeRouter = Router();

homeRouter.get("/", isAuthenticated, homeController.generateHomeView);

export default homeRouter;
