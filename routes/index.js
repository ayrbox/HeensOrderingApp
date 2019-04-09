const customerRoutes = require('./customers');
const {
  menu: menuRoutes,
  category: categoryRoutes,
} = require('./menu');

module.exports = {
  customerRoutes,
  menuRoutes,
  categoryRoutes,
};
