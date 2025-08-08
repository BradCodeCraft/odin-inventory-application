import { Router } from "express";
import itemRouter from "./itemRouter.js";
import * as categoryController from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.route("/").get(categoryController.categoriesGet);
categoryRouter
  .route("/new")
  .get(categoryController.newCategoryGet)
  .post(categoryController.newCategoryPost);
categoryRouter
  .route("/:categoryId")
  .get(categoryController.updateCategoryGet)
  .post(categoryController.updateCategoryPost);
categoryRouter
  .route("/:categoryId/delete")
  .post(categoryController.deleteCategoryPost);
categoryRouter.use("/:categoryId/items", itemRouter);

export default categoryRouter;
