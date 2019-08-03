#!/usr/bin/env node

const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

const Category = require('../src/models/categoryModel');
const Menu = require('../src/models/menuModel');
const User = require('../src/models/user');
const Customer = require('../src/models/customerModel');

// data
const categoryData = require('./data/categories.json');
const menuData = require('./data/menu.json');
const userData = require('./data/users.json');
const generateFakeCustomers = require('./data/customer');


const createCategories = async () => {
  console.log('Creating menu categories.... \n\n\n\n\n'); // eslint-disable-line no-console
  await Promise.all(
    categoryData.map(async ({ _id, name, description }) => {
      const category = new Category({ _id, name, description });
      await category.save();

      console.log('Created', _id, name, description); // eslint-disable-line no-console
    }),
  );
};


const createMenu = async () => {
  console.log('Creating menu items.... \n\n\n\n\n'); // eslint-disable-line no-console
  await Promise.all(
    menuData.map(async ({
      name,
      description,
      price,
      category,
      tags,
    }) => {
      const menu = new Menu({
        name,
        description,
        price,
        category,
        tags,
      });

      await menu.save();

      console.log('Menu', name, description, price, category, tags); // eslint-disable-line no-console
    }),
  );
};

const clearDatabase = async () => {
  console.log('Clearing database......'); // eslint-disable-line no-console

  await User.collection.drop();
  await Category.collection.drop();
  await Menu.collection.drop();
  await Customer.collection.drop();
};

const createUsers = async () => {
  console.log('Creating users...\n\n\n'); // eslint-disable-line no-console

  await Promise.all(
    userData.map(async ({
      _id,
      name,
      email,
      password,
    }) => {
      await new User({
        _id,
        name,
        email,
        password,
      }).save();
      console.log('Users', name, email, password); // eslint-disable-line no-console
    }),
  );
};

const createCustomers = async () => {
  console.log('Creating customers.... \n\n\n'); // eslint-disable-line no-console

  await Promise.all(
    generateFakeCustomers(100).map(async ({
      name,
      phoneNo,
      address,
      postCode,
      note,
    }) => {
      await new Customer({
        name,
        phoneNo,
        address,
        postCode,
        note,
      }).save();
      console.log('Customer', name, phoneNo); // eslint-disable-line no-console
    }),
  );
};

(async () => {
  try {
    console.log('Connecting database'); // eslint-disable-line no-console

    await mongoose.connect(db);
    const option = process.argv[2];

    if (option === '--clear') {
      await clearDatabase();
      console.log('Database cleared...'); // eslint-disable-line no-console
    } else {
      await createUsers();
      await createCategories();
      await createMenu();
      await createCustomers();
      console.log('Data is seed successfully'); // eslint-disable-line no-console
    }
    process.exit();
  } catch (error) {
    console.log('Error: Unable to run seed', error); // eslint-disable-line no-console
    console.log(error.stack); // eslint-disable-line no-console
    process.exit(1);
  }
})();
