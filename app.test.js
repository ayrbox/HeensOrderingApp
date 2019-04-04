const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const testdb = require('./config/keys').mongoURI;

const app = require('./app');

describe('app routes', () => {
  before(() => {
    mongoose
      .connect(testdb)
      .then(() => console.log('Database connected')) // eslint-disable-line
      .catch(err => console.log(err)); // eslint-disable-line
  });

  after(() => {
    mongoose.connection.close();
  });

  describe('/api/users/login', () => {
    describe('when email or password is wrong', () => {
      it('should return 400 for wrong email', (done) => {
        request(app)
          .post('/api/users/login')
          .send({ email: 'notexistsing@admin.com', password: 'password' })
          .expect(404)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.error).to.exist;
            done();
          });
      });

      it('should get 400 for wrongpassword', (done) => {
        request(app)
          .post('/api/users/login')
          .send({ email: 'admin@admin.com', password: 'wrongpassword' })
          .expect('Content-type', /json/)
          .expect(400)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.error).to.exist;
            done();
          });
      });
    });

    // describe('when email address does not exits', () => {
    //       });
  });
});
