import pool from "./pool.js";

/**
 * @returns {Promise<{id: number, name: string>[]}}
 */
export async function getAllCategories() {
  try {
    const { rows } = await pool.query("SELECT * FROM category");

    return rows;
  } catch (err) {
    console.error(`Query failed! Error: ${err.message}`);
  }
}

/**
 * @param {string} categoryId
 *
 * @returns {Promise<{id: number, name: string>[]}}
 */
export async function getCategoryById(categoryId) {
  try {
    const { rows } = await pool.query("SELECT * FROM category WHERE id = $1", [
      categoryId,
    ]);

    return rows[0];
  } catch (err) {
    console.error(`Query failed! Error: ${err.message}`);
  }
}

/**
 * @param {string} categoryId
 */
export async function getAllItemsByCategoryId(categoryId) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM item WHERE category_id = $1",
      [categoryId],
    );

    return rows;
  } catch (err) {
    console.error(`Query failed! Error: ${err.message}`);
  }
}

/**
 * @param {string} categoryId
 * @param {string} itemId
 */
export async function getItemByCategoryIdAndItemId(categoryId, itemId) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM item WHERE category_id = $1 AND id = $2",
      [categoryId, itemId],
    );

    return rows[0];
  } catch (err) {
    console.error(`Query failed! Error: ${err.message}`);
  }
}

/**
 * @param {string} name
 */
export async function createCategory(name) {
  try {
    await pool.query("INSERT INTO category (name) VALUES ($1)", [name]);
  } catch (err) {
    console.error(`Query failed! Error: ${err.message}`);
  }
}

/**
 * @param {string} categoryId
 * @param {string} name
 * @param {string} quantity
 */
export async function createItemByCategoryId(categoryId, name, quantity) {
  try {
    await pool.query(
      "INSERT INTO item (name, category_id, quantity) VALUES ($1, $2, $3)",
      [name, categoryId, quantity],
    );
  } catch (err) {
    console.error(`Query failed! Error: ${err.message}`);
  }
}

/**
 * @param {string} categoryId
 * @param {string} name
 */
export async function updateCategoryById(categoryId, name) {
  try {
    await pool.query("UPDATE category SET name = $1 WHERE id = $2", [
      name,
      categoryId,
    ]);
  } catch (err) {
    console.error(`Query failed! Error: ${err.message}`);
  }
}

/**
 * @param {string} categoryId
 * @param {string} itemId
 * @param {string} name
 * @param {string} quantity
 */
export async function updateItemByCategoryIdAndItemId(
  categoryId,
  itemId,
  name,
  quantity,
) {
  try {
    await pool.query(
      "UPDATE item SET name = $1, quantity = $2 WHERE category_id = $3 AND id = $4",
      [name, quantity, categoryId, itemId],
    );
  } catch (err) {
    console.error(`Query failed! Error: ${err.message}`);
  }
}

/**
 * @param {string} categoryId
 */
export async function deleteCategoryById(categoryId) {
  try {
    await pool.query("DELETE FROM category WHERE id = $1", [categoryId]);
  } catch (err) {
    console.error(`Query failed! Error: ${err.message}`);
  }
}

/**
 * @param {string} categoryId
 * @param {string} itemId
 */
export async function deleteItemByCategoryIdAndItemId(categoryId, itemId) {
  try {
    await pool.query("DELETE FROM item WHERE category_id = $1 AND id = $2", [
      categoryId,
      itemId,
    ]);
  } catch (err) {
    console.error(`Query failed! Error: ${err.message}`);
  }
}
