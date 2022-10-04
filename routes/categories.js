const routes = require("express").Router();
const categoryController = require("../controller/categories");

routes.get("/", categoryController.getCategories);

routes.post("/", categoryController.createCategory);

routes.get("/:id", categoryController.findCategory);

routes.put("/:id", categoryController.editCategory);

routes.delete("/:id", categoryController.deleteCategory);

module.exports = routes;
