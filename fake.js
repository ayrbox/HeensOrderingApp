// const { commerce } = require('faker');
// const {
//   color,
//   department,
//   productName,
//   price,
//   productAdjective,
//   productMaterial,
//   product
// } = commerce;


const mongoose = require('mongoose');


const db = require('./config/keys').mongoURI;
const { createTestCategory, createTestMenu } = require('./utils/test');


// const projectName = Faker.commerce.productName();

// for (let i = 0; i < 100; i++) {
//   console.log({
//     color: color(),
//     department: department(),
//     productName: productName(),
//     price: price(),
//     productAdjective: productAdjective(),
//     productMaterial: productMaterial(),
//     product: product(),
//     // paras: lorem.paragraphs(),
//     // words: lorem.words(),
//     // text: lorem.text(),
//     // lines: lorem.lines(),
//     // slug: lorem.slug(),
//   });
// }



console.log('Hello');

setTimeout(async () => {
  console.log('connecting database');
  await mongoose.connect(db);
  console.log('database connected');

  const c = await createTestCategory();
  console.log('Test', c);



  await mongoose.connection.close();
}, 0);
