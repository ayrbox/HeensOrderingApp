const express = require("express");
const sampleRoutes = express.Router();
const passport = require("passport");

const Category = require("../../models/categoryModel");
const Menu = require("../../models/menuModel");

//data
const categoryData = []; //require("../../data/categories.json");
const menuData = []; //require("../../data/menu.json");

sampleRoutes.post(
  "/install",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //creating categoreis
    categoryData.forEach(c => {
      const _category = new Category({
        _id: c._id,
        name: c.name,
        description: c.description
      });
      _category
        .save()
        .then(_c => console.log(_c))
        .catch(err => console.log(err));
    });

    //creating menu
    menuData.forEach(m => {
      const _menu = new Menu({
        name: m.name,
        description: m.description,
        price: m.price,
        category: m.category,
        tags: m.tags
      });

      _menu
        .save()
        .then(_m => console.log(_m))
        .catch(err => console.log(err));
    });

    res.json({ msg: "Successfully installed" });
  }
);

module.exports = sampleRoutes;
