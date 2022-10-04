const { Category } = require("../models");

class categoryController {
  static async getCategories(req, res, next) {
    try {
      let categories = await Category.findAll();
      res.status(200).json({ categories });
    } catch (err) {
      console.log(err);
    }
  }

  static async createCategory(req, res, next) {
    try {
      let body = {
        name: req.body.name,
      };
      let newCategory = await Category.create(body);
      res.status(201).json(newCategory);
    } catch (err) {
      console.log(err);
    }
  }

  static async findCategory(req, res, next) {
    try {
      const id = req.params.id;
      let category = await Category.findByPk(id);
      res.status(200).json(category);
    } catch (err) {
      console.log(err);
    }
  }

  static async editCategory(req, res, next) {
    try {
      let body = {
        name: req.body.name,
      };
      const id = req.params.id;
      const category = await Category.findByPk(id);
      Category.update(body, { where: { id } });
      res.status(201).json({ message: `Success edit ${body.name}` });
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Category.destroy({ where: { id } });

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

module.exports = categoryController;
