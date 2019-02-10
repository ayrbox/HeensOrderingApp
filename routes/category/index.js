// const { validateCategory } = require('../../validation/categoryValidation');

module.exports = (Category, validateCategory) => {
  const getCategories = (req, res) => {
    const errors = {};
    Category.find().then((categories) => {
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
    Category.findOne({ _id: id }).then((c) => {
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
      return;
    }

    const { name, description } = req.body;
    const category = new Category({
      name,
      description,
    });

    category
      .save()
      .then(c => res.json(c))
      .catch(err => res.status(500).json(err));
  };

  return {
    getCategories,
    getCategory,
    createCategory,
  };
};
