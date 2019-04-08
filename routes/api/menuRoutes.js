const menuRoutes = require('express').Router();
const passport = require('passport');

// @model and validation
const Menu = require('../../models/menuModel');
const {
  validateMenu,
  validateOption,
} = require('../../validation/menuValidation');

// @route        GET api/menu
// @desc         Get all menu list
// @access       private
// @return       [Menu]
menuRoutes.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Menu.find()
      .populate('category') // , ["name", "description"]
      .then((menus) => {
        if (menus.length <= 0) {
          errors.msg = 'Menu not found';
          return res.status(404).json(errors);
        }
        return res.json(menus);
      });
  },
);

// @route        GET api/menu/:id
// @desc         Get single menu for id
// @access       private
// @return       Menu
menuRoutes.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Menu.findOne({ _id: req.params.id })
      .populate('category', ['name', 'description'])
      .then((menu) => {
        if (!menu) {
          errors.msg = 'Menu not found';
          return res.status(404).json(errors);
        }
        return res.json(menu);
      });
  },
);

// @route        GET api/menu/category/:categoryId
// @desc         Get all menu list for a cateogry
// @access       private
// @return       [Menu]
menuRoutes.get(
  '/category/:categoryId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    return Menu.find({ category: req.params.categoryId })
      .populate('category', ['name', 'description'])
      .then((menus) => {
        if (menus.length === 0) {
          errors.msg = 'Menu not found';
          res.status(404).json(errors);
          return;
        }
        res.json(menus);
      });
  },
);

// @route        POST api/menu
// @desc         Create/add new menu
// @access       private
// @return       Menu
menuRoutes.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMenu(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }

    new Menu({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      tags: (req.body.tags || '').split(','),
    }).save()
      .then((m) => {
        res.status(201);
        res.json(m);
      })
      .catch((err) => {
        errors.msg = 'Unable to add menu';
        errors.exception = err;
        res.status(500).json(errors);
      });
  },
);

// @route        PUT api/menu/:id
// @desc         Update menu
// @access       private
// @return       Menu
menuRoutes.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMenu(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }

    const newMenu = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      tags: (req.body.tags || '').split(','),
    };

    Menu.findOne({ _id: req.params.id }).then((menu) => {
      if (!menu) {
        errors.msg = 'Menu not found';
        res.json(errors);
      }

      Menu.findOneAndUpdate(
        { _id: req.params.id },
        { $set: newMenu },
        { new: true },
      ).then((createdMenu) => {
        res.json(createdMenu);
      });
    });
  },
);

// @route        DELETE api/menu
// @desc         Delete menu for the id
// @access       private
// @return       Menu
menuRoutes.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Menu.find({ _id: req.params.id }).then((m) => {
      if (!m) {
        res.status(404).json({ msg: 'Menu not found' });
      }

      Menu.findOneAndRemove({ _id: req.params.id }).then(() => {
        res.json({ msg: 'Menu removed' });
      });
    });
  },
);

// @route        POST api/menus/:id/options
// @desc         Create/Add new menu options
// @access       private
// @return       Menu
menuRoutes.post(
  '/:id/options',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOption(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    Menu.findOne({ _id: req.params.id }).then((menu) => {
      if (!menu) {
        errors.msg = 'Menu not found';
        res.status(404).json(errors);
      }

      const option = {
        description: req.body.description,
        additionalCost: req.body.additionalCost,
      };

      menu.menuOptions.push(option);
      menu.save().then(m => res.json(m));
    });
  },
);

// @route        DELETE api/menus/:id/options/:optionId
// @desc         Delete menu for the id
// @access       private
// @return       Menu
menuRoutes.delete(
  '/:id/options/:optionId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Menu.findOne({ _id: req.params.id }).then((menu) => {
      if (!menu) {
        res.status(404).json({ msg: 'Menu not found' });
      }

      const index = menu.menuOptions
        .map(item => item.id)
        .indexOf(req.params.optionId);

      if (index < 0) {
        res.status(404).json({ msg: 'Option not found' });
      }

      menu.menuOptions.splice(index, 1);

      menu
        .save()
        .then(m => res.json(m))
        .catch((err) => {
          res
            .status(500)
            .json({ msg: 'Unable to delete option', exception: err });
        });
    });
  },
);

module.exports = menuRoutes;
