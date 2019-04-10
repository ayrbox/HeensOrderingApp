module.exports = (Category, validateCategory) => {
  const getCategories = (req, res) => {
    const errors = {};
    return Category.find().then((categories) => {
      if (categories.length <= 0) {
        errors.msg = 'No categories found';
        res.status(404);
        res.json(errors);
        return;
      }
      res.json(categories);
    });
  };

  const getCategory = (req, res) => {
    const errors = {};

    const { id } = req.params;
    return Category.findOne({ _id: id }).then((c) => {
      if (!c) {
        errors.msg = 'Category not found';
        res.status(404);
        res.json(errors);
        return;
      }
      res.json(c);
    });
  };

  const createCategory = (req, res) => {
    const { errors, isValid } = validateCategory(req.body);

    if (!isValid) {
      res.status(400);
      res.json(errors);
      return {};
    }

    const { name, description } = req.body;
    const category = new Category({
      name,
      description,
    });

    return category
      .save()
      .then((c) => {
        res.status(201);
        res.json(c);
      }).catch((err) => {
        res.status(500);
        res.json(err);
      });
  };

  const updateCategory = (req, res) => {
    const { errors, isValid } = validateCategory(req.body);
    if (!isValid) {
      res.status(400);
      res.json(errors);
      return {};
    }

    const category = {
      name: req.body.name,
      description: req.body.description,
    };

    return Category.findOne({ _id: req.params.id }).then((c) => {
      if (!c) {
        res.status(404);
        res.json({ msg: 'Category not found' });
        return {};
      }

      return Category.findOneAndUpdate(
        { _id: req.params.id },
        { $set: category },
        { new: true },
      ).then(updated => res.json(updated))
        .catch((err) => {
          res.status(500);
          res.json(err);
        });
    });
  };

  const deleteCategory = (req, res) => {
    const { id } = req.params;
    return Category.findOne({ _id: id }).then((c) => {
      if (!c) {
        res.status(404);
        res.json({ msg: 'Category not found' });
        return {};
      }
      return Category.findOneAndRemove({ _id: id }).then(() => {
        res.json({ _id: id, msg: 'Category removed' });
      }).catch((err) => {
        res.status(500);
        res.json(err);
      });
    }).catch((err) => {
      res.status(500);
      res.json(err);
    });
  };

  return {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
