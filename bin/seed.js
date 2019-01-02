const mongoose = require('mongoose');
const db = require("../config/keys").mongoURI;

const Category = require('../models/categoryModel');
const Menu = require('../models/menuModel');

//data
const categoryData = require("./data/categories.json");
const menuData = require("./data/menu.json");



const createCategories = async () => {
  console.log('Creating menu categories.... \n\n\n\n\n');
  await Promise.all(
    categoryData.map(async ({ _id, name, description }) => {
      const category = new Category({ _id, name, description });
      await category.save();
      console.log('Created', _id, name, description
    })
  );
}


const createMenu = async () => {
  console.log('Creating menu items.... \n\n\n\n\n');
  await Promise.all(
    menuData.map( async ({ name, description, price, category, tags }) => {
      const menu = new Menu({ name, description, price, category, tags });
      await menu.save();
      console.log('Menu', name, description, price, category, tags);
    })
  )
}

(async () => {
  try {
    console.log('Connecting database');
    await mongoose
      .connect(db)
    // await createUsers()
    await createCategories();
    await createMenu();
    
    console.log('Data is seed successfully');
    process.exit();
  } catch (error) {
    console.log('Error: Unable to run seed', error)
    console.log(error.stack)
    process.exit(1)
  }
})();

