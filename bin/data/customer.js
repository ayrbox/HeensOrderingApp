const Faker = require('faker');

const customerData = n => new Array(n).fill(undefined).map(() => ({
  name: Faker.name.findName(),
  phoneNo: Faker.phone.phoneNumber(),
  address: `${Faker.random.number()} ${Faker.address.streetName()}`,
  postCode: Faker.address.zipCode(),
  note: Faker.lorem.paragraph(),
}));

module.exports = customerData;
