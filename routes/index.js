const { Router } = require('express');

const { secureRoute } = require('../utils/passport');
const customerRoutes = require('./customers');
// const {
//   menu: menuRoutes,
//   category: categoryRoutes,
// } = require('./menu');

const routes = [
  ...customerRoutes,
];

const router = Router();

routes.forEach(({
  method,
  path,
  authenticate,
  handler,
}) => {
  if (authenticate) {
    router[method](path, secureRoute(), handler);
  } else {
    router[method](path, handler);
  }
});


module.exports = router;
