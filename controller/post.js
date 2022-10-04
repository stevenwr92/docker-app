const { Post, Tag, sequelize, User, Category } = require("../models");
const axios = require("axios");

class postController {
  static async getPost(req, res, next) {
    try {
      const post = await Post.findAll({ include: [Category, Tag] });
      res.status(200).json(post);
    } catch (err) {
      console.log(err);
    }
  }

  static async createPost(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let body = {
        title: req.body.title,
        slug: req.body.title,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
        UserMongoId: req.body.UserMongoId,
        // authorId: req.user.id,
      };

      const { name } = req.body;

      let dataPost = await Post.create(body, { transaction: t });

      const postId = dataPost.id;

      const array = name.split(",");
      const b = [];

      for (let i = 0; i < array.length; i++) {
        b.push({ postId, name: array[i] });
      }
      let dataTag = await Tag.bulkCreate(b, { transaction: t });

      await t.commit();
      res.status(201).json({
        message: `Success create post ${dataPost.title} tag ${name}`,
      });
    } catch (err) {
      await t.rollback();
      console.log(err);
    }
  }

  static async findPost(req, res, next) {
    try {
      const id = req.params.id;
      let data = await Post.findByPk(id, { include: Category, Tag });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async findPostCustomer(req, res, next) {
    try {
      const slug = req.params.slug;
      let dataPost = await Post.findOne({
        where: { slug },
        include: [Tag, User],
      });
      res.status(200).json(dataPost);
    } catch (err) {
      console.log(err);
    }
  }

  static async editPost(req, res, next) {
    try {
      const id = req.params.id;
      let body = {
        title: req.body.title,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
        authorId: 1,
        // authorId: req.user.id,
      };
      const { name } = req.body;
      const post = await Post.findByPk(id);
      await Post.update(body, { where: { id } });
      await Tag.update({ name: name }, { where: { postId: id } });

      res.status(201).json({ message: `Success edit ${body.title}, ${name}` });
    } catch (err) {
      console.log(err);
    }
  }

  static async findTag(req, res, next) {
    try {
      const id = req.params.id;

      const data = Tag.findAll({ where: { postId: id } });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Post.destroy({ where: { id } });

      if (result !== 0) {
        res.status(200).json({
          message: `SUCCESS delete`,
        });
      } else {
        throw { name: "NotFound" };
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = postController;
