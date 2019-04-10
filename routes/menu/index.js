// model
const categoryModel = require('../../models/categoryModel');
const menuModel = require('../../models/menuModel');

// validator
const { validateCategory } = require('../../validation/categoryValidation');
const { validateMenu, validateOption } = require('../../validation/menuValidation');

// handlers
const menuHandlers = require('./menu');
const categoryHandlers = require('./category.js');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = categoryHandlers(categoryModel, validateCategory);

const {
  getMenus,
  getMenusByCategory,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
  addOption,
  deleteOption,
} = menuHandlers(menuModel, {
  validateMenu,
  validateOption,
});

const categoryPath = '/api/categories';
const menuPath = '/api/menus';

module.exports = [{
  method: 'get',
  path: categoryPath,
  handler: getCategories,
}, {
  method: 'get',
  path: `${categoryPath}/:id`,
  handler: getCategory,
}, {
  method: 'post',
  path: categoryPath,
  handler: createCategory,
}, {
  method: 'put',
  path: `${categoryPath}/:id`,
  handler: updateCategory,
}, {
  method: 'delete',
  path: `${categoryPath}/:id`,
  handler: deleteCategory,
}, {
  method: 'get',
  path: menuPath,
  handler: getMenus,
}, {
  method: 'get',
  path: `${menuPath}/:id`,
  handler: getMenu,
}, {
  method: 'get',
  path: `${menuPath}/category/:categoryId`,
  handler: getMenusByCategory,
}, {
  method: 'post',
  path: menuPath,
  handler: createMenu,
}, {
  method: 'put',
  path: `${menuPath}/:id`,
  handler: updateMenu,
}, {
  method: 'delete',
  path: `${menuPath}/:id`,
  handler: deleteMenu,
}, {
  method: 'post',
  path: `${menuPath}/:id/options`,
  handler: addOption,
}, {
  method: 'delete',
  path: `${menuPath}/:id/options/:optionId`,
  handler: deleteOption,
}];
