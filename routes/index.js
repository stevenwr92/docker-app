const routes = require("express").Router();
const userRoutes = require("./user");
const postRoutes = require("./post");
const categoriesRoutes = require("./categories");
const auth = require("../middleware/auth");
const customerRoutes = require("./customer");

routes.use("/", userRoutes);

routes.use("/", customerRoutes);

// routes.use(auth);

routes.use("/", postRoutes);

routes.use("/categories", categoriesRoutes);

module.exports = routes;
