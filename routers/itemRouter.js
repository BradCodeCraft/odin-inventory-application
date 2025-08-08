import { Router } from "express";
import * as itemController from "../controllers/itemController.js";

const itemRouter = Router({ mergeParams: true });

itemRouter.route("/").get(itemController.itemsGet);
itemRouter
  .route("/new")
  .get(itemController.newItemGet)
  .post(itemController.newItemPost);
itemRouter
  .route("/:itemId")
  .get(itemController.updateItemGet)
  .post(itemController.updateItemPost);
itemRouter.route("/:itemId/delete").post(itemController.deleteItemPost);

export default itemRouter;
