const { commerce, lorem } = require('faker');
const jsonwebtoken = require('jsonwebtoken');

const Category = require('../../models/categoryModel');
const Menu = require('../../models/menuModel');
// const User = require('../..//models/user');
// const Customer = require('../../models/customerModel');
const { secretKey } = require('../../config/keys');


const {
  color,
  department,
  productName,
  price,
  productAdjective,
  productMaterial,
  product,
} = commerce;

const { lines } = lorem;

const auth = userId => (request) => {
  const validToken = jsonwebtoken.sign({
    id: userId || '5c9f8c64cae7314e3b9441d8',
    name: 'Test User Name',
  }, secretKey, { expiresIn: 3600 });

  return request
    .set({ Authorization: `Bearer ${validToken}` });
};


const createTestCategory = async () => {
  try {
    const c = new Category({
      name: department(),
      description: lines(),
    });

    return await c.save();

  } catch (err) {
    console.log(err);
    return 200;
  }
};

const createTestMenu = async () => {
  const category = await createTestCategory();
  console.log('CATEGORY', category);
  return category;
};


module.exports = {
  auth,
  createTestCategory,
  createTestMenu,
};
