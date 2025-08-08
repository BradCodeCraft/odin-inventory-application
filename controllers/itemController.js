import { request, response } from "express";
import { body, param, validationResult } from "express-validator";
import * as db from "../db/queries.js";

/**
 * @param {request} req
 * @param {response} res
 */
export async function itemsGet(req, res) {
  try {
    const { categoryId } = req.params;
    const items = await db.getAllItemsByCategoryId(categoryId);

    res.render("items/items", { items: items, categoryId: categoryId });
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
export function newItemGet(req, res) {
  const { categoryId } = req.params;
  res.render("items/newItem", { categoryId: categoryId });
}

const validateItem = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must have at least 1 character.")
    .custom(async (value, { req }) => {
      const { categoryId } = req.params;
      const items = await db.getAllItemsByCategoryId(categoryId);
      if (items.find((item) => item.name == value))
        throw new Error("Item must be unique.");
    }),
  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be positive."),
];

export const newItemPost = [
  validateItem,
  /**
   * @param {request} req
   * @param {response} res
   */
  async (req, res) => {
    try {
      const { categoryId } = req.params;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).render("items/newItem", {
          categoryId: categoryId,
          errors: errors.array(),
        });
        return;
      }

      const { name, quantity } = req.body;
      await db.createItemByCategoryId(categoryId, name, quantity);
      res.redirect(`/categories/${categoryId}/items`);
    } catch (err) {
      console.error(err);
    }
  },
];

/**
 * @param {request} req
 * @param {response} res
 */
export async function updateItemGet(req, res) {
  try {
    const { categoryId, itemId } = req.params;
    const item = await db.getItemByCategoryIdAndItemId(categoryId, itemId);
    res.render("items/updateItem", { item: item, categoryId: categoryId });
  } catch (err) {
    console.error(err);
  }
}

const validateItemUpdate = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must have at least 1 character.")
    .custom(async (value, { req }) => {
      const { categoryId, itemId } = req.params;
      const items = await db.getAllItemsByCategoryId(categoryId);
      if (items.find((item) => item.name == value && item.id != itemId))
        throw new Error("Item must be unique.");
    }),
  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be positive."),
];

export const updateItemPost = [
  validateItemUpdate,
  /**
   * @param {request} req
   * @param {response} res
   */
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { categoryId, itemId } = req.params;

      if (!errors.isEmpty()) {
        const item = await db.getItemByCategoryIdAndItemId(categoryId, itemId);
        res.status(400).render("items/updateItem", {
          item: item,
          categoryId: categoryId,
          errors: errors.array(),
        });
        return;
      }

      const { name, quantity } = req.body;
      await db.updateItemByCategoryIdAndItemId(
        categoryId,
        itemId,
        name,
        quantity,
      );
      res.redirect(`/categories/${categoryId}/items`);
    } catch (err) {
      console.error(err);
    }
  },
];

/**
 * @param {request} req
 * @param {response} res
 */
export async function deleteItemPost(req, res) {
  try {
    const { categoryId, itemId } = req.params;
    await db.deleteItemByCategoryIdAndItemId(categoryId, itemId);
    res.redirect(`/categories/${categoryId}/items`);
  } catch (err) {
    console.error(err);
  }
}
