const mongoose = require('mongoose');

const app = require('./app');
const db = require('./config/keys').mongoURI;

// database connection
mongoose
  .connect(db)
  .then(() => console.log('Database connected')) // eslint-disable-line
  .catch(err => console.log(err)); // eslint-disable-line

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Express running on port ${port}`)); // eslint-disable-line
