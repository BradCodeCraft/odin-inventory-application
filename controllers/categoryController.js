import { request, response } from "express";
import { body, validationResult } from "express-validator";
import * as db from "../db/queries.js";

/**
 * @param {request} req
 * @param {response} res
 */
export async function categoriesGet(req, res) {
  try {
    const categories = await db.getAllCategories();

    res.render("categories/categories", { categories: categories });
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
export function newCategoryGet(req, res) {
  res.render("categories/newCategory");
}

const validateCategory = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must have at least 1 character.")
    .custom(async (value) => {
      const categories = await db.getAllCategories();
      if (categories.find((category) => category.name == value) !== undefined)
        throw new Error("Name must be unique.");
    }),
];
export const newCategoryPost = [
  validateCategory,
  /**
   * @param {request} req
   * @param {response} res
   */
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res
          .status(400)
          .render("categories/newCategory", { errors: errors.array() });
        return;
      }

      const { name } = req.body;
      await db.createCategory(name);
      res.redirect("/categories");
    } catch (err) {
      console.error(err);
    }
  },
];

/**
 * @param {request} req
 * @param {response} res
 */
export async function updateCategoryGet(req, res) {
  try {
    const { categoryId } = req.params;
    const category = await db.getCategoryById(categoryId);

    res.render("categories/updateCategory", { category: category });
  } catch (err) {
    console.error(err);
  }
}

export const updateCategoryPost = [
  validateCategory,
  /**
   * @param {request} req
   * @param {response} res
   */
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { categoryId } = req.params;

      if (!errors.isEmpty()) {
        const category = await db.getCategoryById(categoryId);
        res.status(400).render("categories/updateCategory", {
          category: category,
          errors: errors.array(),
        });
        return;
      }

      const { name } = req.body;
      await db.updateCategoryById(categoryId, name);
      res.redirect("/categories");
    } catch (err) {
      console.error(err);
    }
  },
];

/**
 * @param {request} req
 * @param {response} res
 */
export async function deleteCategoryPost(req, res) {
  try {
    const { categoryId } = req.params;
    await db.deleteCategoryById(categoryId);

    res.redirect("/categories");
  } catch (err) {
    console.error(err);
  }
}
