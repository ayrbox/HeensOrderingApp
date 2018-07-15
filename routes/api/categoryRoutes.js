const express = require("express");
const categoryRoutes = express.Router();
const passport = require("passport");

//@model and validation
const Category = require("../../models/categoryModel");
const { validateCategory } = require("../../validation/categoryValidation");

//@route        GET api/categories/
//@desc         List all the categores
//@access       private
//@return       Category
categoryRoutes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Category.find().then(categories => {
      if (categories.length <= 0) {
        errors.msg = "No categories found";
        return res.status(404).json(errors);
      }

      res.json(categories);
    });
  }
);

//@route        GET api/categories/:id
//@desc         Get category for the id
//@access       private
//@return       Category
categoryRoutes.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Category.findOne({ _id: req.params.id }).then(c => {
      if (!c) {
        errors.msg = "Customer not found";
        res.status(404).json(errors);
      }

      res.json(c);
    });
  }
);

//@route        POST api/categories/
//@desc         Create new category
//@access       private
//@return       Category
categoryRoutes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategory(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const _category = new Category({
      name: req.body.name,
      description: req.body.description
    });

    _category
      .save()
      .then(c => res.json(c))
      .catch(err => console.log(err));
  }
);

//@route        PUT api/categories/:id
//@desc         Update cateogry info
//@access       private
//@return       Category
categoryRoutes.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategory(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const _category = {
      name: req.body.name,
      description: req.body.description
    };

    Category.findOne({ _id: req.params.id }).then(c => {
      if (!c) {
        return res.status(404).json({ msg: "Category not found" });
      }

      Category.findOneAndUpdate(
        { _id: req.params.id },
        { $set: _category },
        { new: true }
      ).then(updated => res.json(updated));
    });
  }
);

//@route        DELETE api/categories/:id
//@desc         Delete category
//@access       private
//@return       Category
categoryRoutes.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.find({ _id: req.params.id }).then(c => {
      if (!c) {
        return req.status(404).json({ msg: "Category not found" });
      }
      Category.findOneAndRemove({ _id: req.params.id }).then(() => {
        res.json({ msg: "Category removed" });
      });
    });
  }
);

module.exports = categoryRoutes;
