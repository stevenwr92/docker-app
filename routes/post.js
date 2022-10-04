const routes = require("express").Router();
const postController = require("../controller/post");

routes.get("/post", postController.getPost);

routes.get("/post/:id", postController.findPost);

routes.put("/post/:id", postController.editPost);

routes.post("/post/create", postController.createPost);

routes.delete("/post/:id", postController.deletePost);

module.exports = routes;
