const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const testdb = require('./config/keys').mongoURI;

const app = require('./app');

describe('app routes', () => {
  before(() => {
    // todo: connection to test database and run test script
    mongoose
      .connect(testdb)
      .then(() => console.log('Database connected')) // eslint-disable-line
      .catch(err => console.log(err)); // eslint-disable-line
  });

  after(() => {
    console.log('Required to disconnet from database');
    // mongoose.disconnect();
  });

  describe('/api/users', () => {
    describe('/login', (done) => {
      it('should get 400 on wrong password', () => {
        request(app)
          .post('/api/users/login')
          .send({ email: 'admin@admin.com', password: 'wrongpassword' })
          .expect('Content-type', /json/)
          .expect(200)
          .end((err, res) => {
            console.log(res);
            // res.status.should.equal(200);
            // res.body.error.should.equal(false);
            // res.body.data.should.equal(30);
            expect(res.status).to.equal(400);
            done();
          });
      });
    });
  });
});
