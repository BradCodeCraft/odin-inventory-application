# Inventory Application

An Express application of a ficticious inventory management system for a
ficticious store.

## Database

### Entities

Category entity has a **one-to-many** relationship with Item entity. In other
words, a category can have **zero or more** items, but an item **_must_ belong
to one** category.

### Entity Relational Diagram

![erd](https://github.com/BradCodeCraft/odin-inventory-application/blob/main/public/odin-inventory-application-erd.jpg?raw=true)

## Application Programming Interfaces (APIs)

### GET requests

`/` - retrieves welcome page

`/categories` - retrieves all categories

`/categories/new` - retrieves new category form

`/categories/:categoryId` - retrieves specific information about a category of
id _categoryId_

`/categories/:categoryId/items` - retrieves all items in the category of id
_categoryId_

`/categories/:categoryId/items/new` - retrieves new item form for the category
of id _categoryId_

`/categories/:categoryId/items/:itemId` - retrieves a item of id _itemId_ in
the category of id _categoryId_

### POST requests

`/categories/new` - creates a new category

`/categories/:categoryId` - updates category of id _categoryId_

`/categories/:categoryId/items/new` - creates an item in the category of id
_categoryId_

`/categories/:categoryId/items/:itemId` - updates a item of id _itemId_ in the
category of id _categoryId_

### DELETE requests

`/categories/:categoryId/delete` - deletes a category of id _categoryId_

`/categories/:categoryId/items/:itemId/delete` - deletes the item of id
_itemId_ in the category of id _categoryId_

> **All categories DELETE requests enforce `CASCADE DELETE.`** This means that,
> e.g., deleting a category will delete all items associated with that category
> (via the _categoryId_ foreign key).
