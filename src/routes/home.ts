import { Router } from "express";
import * as homeController from "../controllers/home.js";

const homeRouter = Router();

homeRouter.get("/", homeController.generateHomeView);

export default homeRouter;
