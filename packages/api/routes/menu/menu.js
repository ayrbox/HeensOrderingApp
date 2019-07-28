module.exports = (Menu, { validateMenu, validateOption }) => {
  const getMenus = (req, res) => {
    const errors = {};
    return Menu.find()
      .populate('category') // , ["name", "description"]
      .then((menus) => {
        if (menus.length <= 0) {
          errors.msg = 'Menus not found';
          res.status(404);
          res.json(errors);
        }
        res.json(menus);
      });
  };

  const getMenusByCategory = (req, res) => Menu.find({ category: req.params.categoryId })
    .then((menus) => {
      if (menus.length === 0) {
        res.status(404);
        res.json({ msg: 'Menu not found' });
        return;
      }
      res.json(menus);
    }).catch((err) => {
      res.status(500);
      res.json(err);
    });

  const getMenu = (req, res) => {
    const errors = {};
    return Menu.findOne({ _id: req.params.id })
      .populate('category', ['name', 'description'])
      .then((menu) => {
        if (!menu) {
          errors.msg = 'Menu not found';
          res.status(404);
          res.json(errors);
          return;
        }
        res.json(menu);
      });
  };

  const createMenu = (req, res) => {
    const { errors, isValid } = validateMenu(req.body);
    if (!isValid) {
      res.status(400);
      res.json(errors);
      return {};
    }
    return new Menu({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      tags: (req.body.tags || '').split(','),
      menuOptions: req.body.menuOptions,
    }).save()
      .then((m) => {
        res.status(201);
        res.json(m);
      })
      .catch((err) => {
        res.status(500);
        res.json(err);
      });
  };

  const updateMenu = (req, res) => {
    const { errors, isValid } = validateMenu(req.body);
    if (!isValid) {
      res.status(400);
      res.json(errors);
      return {};
    }

    const newMenu = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      tags: (req.body.tags || '').split(','),
      menuOptions: req.body.menuOptions,
    };

    return Menu.findOne({ _id: req.params.id }).then((menu) => {
      if (!menu) {
        res.status(404);
        res.json({ msg: 'Menu not found' });
        return {};
      }

      return Menu.findOneAndUpdate(
        { _id: req.params.id },
        { $set: newMenu },
        { new: true },
      ).then((createdMenu) => {
        res.json(createdMenu);
      }).catch((err) => {
        res.status(500);
        res.json(err);
      });
    });
  };

  const deleteMenu = (req, res) => Menu.findOne({ _id: req.params.id }).then((m) => {
    if (!m) {
      res.status(404);
      res.json({ msg: 'Menu not found' });
      return;
    }

    Menu.findOneAndRemove({ _id: req.params.id }).then(() => {
      res.json({ msg: 'Menu deleted' });
    }).catch((err) => {
      res.status(500);
      res.json(err);
    });
  }).catch((err) => {
    res.status(500);
    res.json(err);
  });

  const addOption = (req, res) => {
    const { errors, isValid } = validateOption(req.body);

    if (!isValid) {
      res.status(400);
      res.json(errors);
      return {};
    }

    return Menu.findOne({ _id: req.params.id }).then((menu) => {
      if (!menu) {
        res.status(404);
        res.json({
          msg: 'Menu not found',
        });
        return;
      }

      const { description, additionalCost } = req.body;

      menu.menuOptions.push({
        description,
        additionalCost,
      });
      menu.save().then((m) => {
        res.status(201);
        res.json(m);
      });
    }).catch((err) => {
      res.status(500);
      res.json(err);
    });
  };

  const deleteOption = (req, res) => Menu.findOne({ _id: req.params.id }).then((menu) => {
    if (!menu) {
      res.status(404);
      res.json({ msg: 'Menu not found' });
      return {};
    }

    const index = menu.menuOptions
      .map(item => item.id)
      .indexOf(req.params.optionId);

    if (index < 0) {
      res.status(404);
      res.json({ msg: 'Option not found' });
      return {};
    }

    menu.menuOptions.splice(index, 1);

    return menu
      .save()
      .then(m => res.json(m))
      .catch((err) => {
        res
          .status(500)
          .json({ msg: 'Unable to delete option', exception: err });
      });
  });

  return {
    getMenus,
    getMenusByCategory,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
    addOption,
    deleteOption,
  };
};
