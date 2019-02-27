module.exports = (Menu, { validateMenu, validateOption }) => {
  const getMenus = (req, res) => {
    const errors = {};
    Menu.find()
      .populate('category') // , ["name", "description"]
      .then((menus) => {
        if (menus.length <= 0) {
          errors.msg = 'Not found';
          return res.status(404).json(errors);
        }
        return res.json(menus);
      });
  };

  const getMenusByCategory = (req, res) => {
    const errors = {};
    Menu.find({ category: req.params.categoryId }).then((menus) => {
      if (menus.length === 0) {
        errors.msg = 'Not menu in the category';
        return res.status(404).json(errors);
      }

      return res.json(menus);
    });
  };

  const getMenu = (req, res) => {
    const errors = {};
    Menu.findOne({ _id: req.params.id })
      .populate('category', ['name', 'description'])
      .then((menu) => {
        if (!menu) {
          errors.msg = 'Not found';
          return res.status(404).json(errors);
        }
        return res.json(menu);
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
    }).save()
      .then(m => res.json(m))
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
    }

    Menu.findOneAndRemove({ _id: req.params.id }).then(() => {
      res.json({ msg: 'Menu removed' });
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
  };

  const deleteOption = (req, res) => {
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
  };

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
