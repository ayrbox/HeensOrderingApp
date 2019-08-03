#!/usr/bin/env node
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

const Category = require('../src/models/categoryModel');
const Menu = require('../src/models/menuModel');
const User = require('../src/models/user');
const Customer = require('../src/models/customerModel');

const clearDatabase = async () => {
  console.log('Clearing database......'); // eslint-disable-line no-console

  await User.collection.drop();
  await Category.collection.drop();
  await Menu.collection.drop();
  await Customer.collection.drop();
};

(async () => {
  try {
    console.log('Connecting database'); // eslint-disable-line no-console
    await mongoose.connect(db);
    console.log('Database Connected'); // eslint-disable-line no-console

    await clearDatabase();
    console.log('Database cleared...'); // eslint-disable-line no-console
    
    process.exit();
  } catch (error) {
    console.log('Error: Unable to run seed', error); // eslint-disable-line no-console
    console.log(error.stack); // eslint-disable-line no-console
    process.exit(1);
  }
})();