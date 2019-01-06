const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

const Category = require('../models/categoryModel');
const Menu = require('../models/menuModel');
const User = require('../models/user');
const Customer = require('../models/customerModel');

// data
const categoryData = require('./data/categories.json');
const menuData = require('./data/menu.json');
const userData = require('./data/users.json');
const customerData = require('./data/customer');


const createCategories = async () => {
  console.log('Creating menu categories.... \n\n\n\n\n');
  await Promise.all(
    categoryData.map(async ({ _id, name, description }) => {
      const category = new Category({ _id, name, description });
      await category.save();
      console.log('Created', _id, name, description); // eslint-disable-line
    }),
  );
};


const createMenu = async () => {
  console.log('Creating menu items.... \n\n\n\n\n');
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

      console.log('Menu', name, description, price, category, tags); // eslint-disable-line
    }),
  );
};

const clearDatabase = async () => {
  console.log('Clearing database......'); // eslint-disable-line

  await User.collection.drop();
  await Category.collection.drop();
  await Menu.collection.drop();
  await Customer.collection.drop();
};

const createUsers = async () => {
  console.log('Creating users...\n\n\n'); // eslint-disable-line

  await Promise.all(
    userData.map(async ({ name, email, password }) => {
      await new User({ name, email, password }).save();
      console.log('Users', name, email, password); // eslint-disable-line
    }),
  );
};

const createCustomers = async () => {
  console.log('Creating customers.... \n\n\n'); // eslint-disable-line

  await Promise.all(
    customerData.map(async ({
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
      console.log('Customer', name, phoneNo); // eslint-disable-line
    }),
  );
};

(async () => {
  try {
    console.log('Connecting database'); // eslint-disable-line

    await mongoose.connect(db);
    const option = process.argv[2];

    if (option === '--clear') {
      await clearDatabase();
      console.log('Database cleared...'); // eslint-disable-line
    } else {
      await createUsers();
      await createCategories();
      await createMenu();
      await createCustomers();
      console.log('Data is seed successfully'); // eslint-disable-line
    }
    process.exit();
  } catch (error) {
    console.log('Error: Unable to run seed', error); // eslint-disable-line
    console.log(error.stack); // eslint-disable-line
    process.exit(1);
  }
})();
