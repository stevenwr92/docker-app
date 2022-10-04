const routes = require("express").Router();
const postController = require("../controller/post");

routes.get("/customer/post", postController.getPost);

routes.get("/customer/:slug", postController.findPostCustomer);

module.exports = routes;
