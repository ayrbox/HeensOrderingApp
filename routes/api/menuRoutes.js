const menuRoutes = require("express").Router();

//@model and validation
const Menu = require("../../models/menuModel");
const {
  validateMenu,
  validateOption
} = require("../../validation/menuValidation");

//@route        GET api/menu
//@desc         Get all menu list
//@access       Public //TODO: Private route
//@return       [Menu]
menuRoutes.get("/", (req, res) => {
  const errors = {};
  Menu.find().then(menus => {
    if (menus.length <= 0) {
      errors.msg = "Not found";
      return res.status(404).json(errors);
    }

    res.json(menus);
  });
});

//@route        GET api/menu/:id
//@desc         Get single menu for id
//@access       Public //TODO: Private route
//@return       Menu
menuRoutes.get("/:id", (req, res) => {
  const errors = {};
  Menu.find({ _id: req.params.id }).then(menu => {
    if (!menu) {
      errors.msg = "Not found";
      return res.status(404).json(errors);
    }

    res.json(menu);
  });
});

//@route        GET api/menu/category/:categoryId
//@desc         Get all menu list for a cateogry
//@access       Public //TODO: Private route
//@return       [Menu]
menuRoutes.get("/category/:cateogryId", (req, res) => {
  const errors = {};
  Menu.find({ category: req.params.categoryId }).then(menus => {
    if (menus.length === 0) {
      errors.msg = "Not menu in the category";
      return res.status(404).json(errors);
    }

    res.json(menus);
  });
});

//@route        POST api/menu
//@desc         Create/add new menu
//@access       Public //TODO: Private route
//@return       Menu
menuRoutes.post("/", (req, res) => {
  const { errors, isValid } = validateMenu(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const _menu = new Menu({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    tags: (req.body.tags || "").split(",")
  });

  _menu
    .save()
    .then(m => res.json(m))
    .catch(err => {
      errors.msg = "Unable to add menu";
      errors.exception = err;
      res.status(500).json(errors);
    });
});

//@route        PUT api/menu/:id
//@desc         Update menu
//@access       Public //TODO: Private route
//@return       Menu
menuRoutes.put("/:id", (req, res) => {
  const { errors, isValid } = validateMenu(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const _menu = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    tags: (req.body.tags || "").split(",")
  };

  Menu.findOne({ _id: req.params.id }).then(menu => {
    if (!menu) {
      errors.msg = "Menu not found";
      return res.json(errors);
    }

    Menu.findOneAndUpdate(
      { _id: req.params.id },
      { $set: _menu },
      { new: true }
    ).then(menu => {
      res.json(menu);
    });
  });
});

//@route        DELETE api/menu
//@desc         Delete menu for the id
//@access       Public //TODO: Private route
//@return       Menu
menuRoutes.delete("/:id", (req, res) => {
  Menu.find({ _id: req.params.id }).then(m => {
    if (!m) {
      return req.status(404).json({ msg: "Menu not found" });
    }

    Menu.findOneAndUpdate({ _id: req.params.id }).then(() => {
      res.json({ msg: "Menu removed" });
    });
  });
});

//@route        POST api/menus/:id/options
//@desc         Create/Add new menu options
//@access       Public //TODO: Private route
//@return       Menu
menuRoutes.post("/:id/options", (req, res) => {
  const { errors, isValid } = validateOption(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Menu.findOne({ _id: req.params.id }).then(menu => {
    if (!menu) {
      errors.msg = "Menu not found";
      return res.status(404).json(errors);
    }

    const _option = {
      description: req.body.description,
      additionalCost: req.body.additionalCost
    };

    menu.menuOptions.push(_option);
    menu.save().then(m => res.json(m));
  });
});

//@route        DELETE api/menus/:id/options/:optionId
//@desc         Delete menu for the id
//@access       Public //TODO: Private route
//@return       Menu
menuRoutes.delete("/:id/options/:optionId", (req, res) => {
  Menu.findOne({ _id: req.params.id }).then(menu => {
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    const _index = menu.menuOptions
      .map(item => item.id)
      .indexOf(req.params.optionId);

    if (_index < 0) {
      return res.status(404).json({ msg: "Option not found" });
    }

    menu.menuOptions.splice(_index, 1);

    menu
      .save()
      .then(m => res.json(m))
      .catch(err => {
        res
          .status(500)
          .json({ msg: "Unable to delete option", exception: err });
      });
  });
});

module.exports = menuRoutes;
