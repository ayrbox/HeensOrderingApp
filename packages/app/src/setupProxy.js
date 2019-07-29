const proxy = require('http-proxy-middleware');

const { PROXY_URL = 'http://localhost:5000/' } = process.env;

module.exports = (app) => {
  app.use(proxy('/api', { target: PROXY_URL }));
};
