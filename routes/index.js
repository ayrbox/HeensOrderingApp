const { Router } = require('express');

const { secureRoute } = require('../utils/passport');
const customerRoutes = require('./customers');
const menuRoutes = require('./menu');

const routes = [
  ...customerRoutes,
  ...menuRoutes,
];

const router = Router();

routes.forEach(({
  method,
  path,
  excludeAuthenticate,
  handler,
}) => {
  if (excludeAuthenticate) {
    router[method](path, handler);
  } else {
    router[method](path, secureRoute(), handler);
  }
});


module.exports = router;
