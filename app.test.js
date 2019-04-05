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


  describe('GET /api/customers', () => {
    context('without valid token', () => {
      it('should return unauthorised 401', (done) => {
        request(app)
          .get('/api/customers/')
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.text).to.equal('Unauthorized');
            done();
          });
      });
    });

    context('with valid token', () => {
      it('should return list of customers', (done) => {
        request(app)
          .get('/api/customers/')
          .use(auth())
          .expect('Content-type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(Array.isArray(res.body)).to.equal(true);
            res.body.forEach((customer) => {
              expect(customer).to.have.property('name');
              expect(customer).to.have.property('phoneNo');
              expect(customer).to.have.property('address');
              expect(customer).to.have.property('postCode');
              expect(customer).to.have.property('note');
              expect(customer).to.have.property('registeredDate');
            });
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });

  describe('GET /api/customers/:id', () => {
    context('without valid token', () => {
      it('should return unauthorised 401', (done) => {
        request(app)
          .get('/api/customers/234203894028')
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.text).to.equal('Unauthorized');
            done();
          });
      });
    });

    context('with valid JWT token', () => {
      it('should retun 404', (done) => {
        request(app)
          .get('/api/customers/5c9f8c64cae7314e3b9441d8')
          .use(auth())
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });

      it('should return customers', (done) => {
        request(app)
          .get('/api/customers/5ca7b3b4743b051fbb7aa28c')
          .use(auth())
          .expect('Content-type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            const customer = res.body;
            expect(customer).to.have.property('name');
            expect(customer).to.have.property('phoneNo');
            expect(customer).to.have.property('address');
            expect(customer).to.have.property('postCode');
            expect(customer).to.have.property('note');
            expect(customer).to.have.property('registeredDate');
            done();
          });
      });
    });
  });

  describe('POST /api/customers', () => {
    it('should return 401 unauthorised', (done) => {
      request(app)
        .post('/api/customers')
        .send({})
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should return 400 invalid data', (done) => {
      request(app)
        .post('/api/customers')
        .use(auth())
        .send({})
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return 200', (done) => {
      const testCustomer = {
        name: 'Test',
        phoneNo: '23947293742',
        address: 'test road',
        postCode: 'TESTCODE',
        note: 'testnote',
      };
      request(app)
        .post('/api/customers')
        .use(auth())
        .send(testCustomer)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          const {
            _id,
            registeredDate,
            __v,
            ...data
          } = res.body;
          expect(data).to.deep.equal(testCustomer);
          expect(_id).to.be.a('string');
          expect(registeredDate).to.exist;
          expect(__v).to.be.a('number');

          done();
        });
    });
  });

  describe('PUT /customers/:id', () => {
    let customerId;
    before((done) => {
      const testCustomer = {
        name: 'Test Update',
        phoneNo: '2462469',
        address: 'Update Road',
        postCode: 'UPD4TE',
        note: 'Note Update',
      };
      request(app)
        .post('/api/customers')
        .use(auth())
        .send(testCustomer)
        .end((err, res) => {
          const { _id } = res.body;
          customerId = _id;
          done();
        });
    });

    it('should return 401 unauthorised');

    it('should update existing customer', (done) => {
      request(app)
        .put(`/api/customers/${customerId}`)
        .use(auth())
        .send({
          name: 'Test Updated',
          phoneNo: '0000000',
          address: 'Updated Road',
          postCode: 'UPD4T3D',
          note: 'Updated Note',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          const {
            _id,
            name,
            phoneNo,
            address,
            postCode,
            note,
          } = res.body;
          expect(_id).to.equal(customerId);
          expect(name).to.equal('Test Updated');
          expect(phoneNo).to.equal('0000000');
          expect(address).to.equal('Updated Road');
          expect(postCode).to.equal('UPD4T3D');
          expect(note).to.equal('Updated Note');
          done();
        });
    });
  });
});
