const { Router } = require('express');

const { secureRoute } = require('../utils/passport');
const customerRoutes = require('./customers');
const menuRoutes = require('./menu');
const orderRoutes = require('./order');
const userRoutes = require('./users');

const routes = [
  ...customerRoutes,
  ...menuRoutes,
  ...orderRoutes,
  ...userRoutes,
];

const router = Router();

routes.forEach(({
  method,
  path,
  excludeAuthentication,
  handler,
}) => {
  if (excludeAuthentication) {
    router[method](path, handler);
  } else {
    router[method](path, secureRoute(), handler);
  }
});


module.exports = router;
