import { Router } from "express";
import * as baseController from "../controllers/baseController.js";

const baseRouter = Router();

baseRouter.route("/").get(baseController.welcomePageGet);

export default baseRouter;
