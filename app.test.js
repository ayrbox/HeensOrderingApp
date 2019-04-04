const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const testdb = require('./config/keys').mongoURI;

const app = require('./app');
const { auth } = require('./utils/test');

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
    context('when email or password is wrong', () => {
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

    context('when user email and password is correct', () => {
      it('should return 200 with token', (done) => {
        request(app)
          .post('/api/users/login')
          .send({ email: 'admin@admin.com', password: 'password' })
          .expect('Content-type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.token).to.match(/Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
            done();
          });
      });
    });
  });


  describe('customers', () => {
    context('with valid token', () => {
      it('list customer', (done) => {
        request(app)
          .get('/api/customers/')
          .use(auth())
          .expect('Content-type', /json/)
          .expect(200)
          .end((err, res) => {
            console.log('RESPONSE', res.body);
            expect(Array.isArray(res.body)).to.equal(true);
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });
});
