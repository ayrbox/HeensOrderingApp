const Faker = require('faker');

const generateFakeCustomers = n => new Array(n).fill(undefined).map(() => ({
  name: Faker.name.findName(),
  phoneNo: Faker.phone.phoneNumber(),
  address: `${Faker.random.number()} ${Faker.address.streetName()}`,
  postCode: Faker.address.zipCode(),
  note: Faker.lorem.paragraph(),
}));

module.exports = generateFakeCustomers;
