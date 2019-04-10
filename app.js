const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const path = require('path');

// const path = require("path");
const app = express();

// import routes
const userRoutes = require('./routes/api/userRoutes');
const routes = require('./routes');
const orderRoutes = require('./routes/api/orderRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passportjs middleware
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', userRoutes);
app.use('/api/orders/', orderRoutes);
app.use(routes); 


// server static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
