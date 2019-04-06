const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const testdb = require('./config/keys').mongoURI;

const app = require('./app');
const { auth } = require('./utils/test');

describe('app routes', () => {
  before((done) => {
    mongoose
      .connect(testdb)
      .then(() => console.log('Database connected')) // eslint-disable-line
      .catch(err => console.log(err)); // eslint-disable-line
    done();
  });

  after((done) => {
    mongoose.connection.close();
    done();
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
          expect(Object.keys(res.body)).to.have.members([
            '_id',
            'name',
            'phoneNo',
            'address',
            'postCode',
            'note',
            'registeredDate',
            '__v',
          ]);
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

    it('should return 401 unauthorised', (done) => {
      request(app)
        .put(`/api/customers/${customerId}`)
        .send({
          name: 'test',
          phoneNo: '000',
          address: 'Update',
          postCode: 'test',
          note: 'note',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should return 400 bad request', (done) => {
      request(app)
        .put(`/api/customers/${customerId}`)
        .use(auth())
        .send({
          name: 'Bad update',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

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


  describe('DELETE /api/customer/:id', () => {
    it('should return 401 unauthorised', (done) => {
      request(app)
        .delete('/api/customers/5c9f8c64cae7314e3b9441d8')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('Unauthorized');
          done();
        });
    });

    it('should return 404 not found', (done) => {
      request(app)
        .delete('/api/customers/5c9f8c64cae7314e3b9441d8')
        .use(auth())
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.deep.equal({
            msg: 'Customer not found',
          });
          done();
        });
    });

    it('should remove added customer', (done) => {
      // add customer before delete
      request(app)
        .post('/api/customers')
        .use(auth())
        .send({
          name: 'Test',
          phoneNo: '23947293742',
          address: 'test road',
          postCode: 'TESTCODE',
          note: 'testnote',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          const { _id } = res.body;

          // delete request
          request(app)
            .delete(`/api/customers/${_id}`)
            .use(auth())
            .end((deleteErr, deleteRes) => {
              expect(deleteRes.status).to.equal(200);
              expect(deleteRes.body).to.deep.equal({
                msg: 'Customer Removed',
              });
              done();
            });
        });
    });
  });

  describe('Category', () => {
    let categoryId;
    const testCategory = {
      name: 'Category Name',
      description: 'Test Category',
    };

    before((done) => {
      request(app)
        .post('/api/categories')
        .use(auth())
        .send(testCategory)
        .end((err, res) => {
          const { _id } = res.body;
          categoryId = _id;
          done();
        });
    });

    describe('GET /api/categories', () => {
      it('should return 401 unauthorized', (done) => {
        request(app)
          .get('/api/categories')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.text).to.equal('Unauthorized');
            done();
          });
      });

      it('should return 200 with categories', (done) => {
        request(app)
          .get('/api/categories')
          .use(auth())
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body)).to.equal(true);
            res.body.forEach((category) => {
              expect(Object.keys(category)).to.have.members([
                '_id',
                'name',
                'description',
                '__v',
              ]);
            });
            done();
          });
      });
    });

    describe('GET /api/categories/:id', () => {
      it('should return 401 unauthorised', (done) => {
        request(app)
          .get(`/api/categories/${categoryId}`)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.text).to.equal('Unauthorized');
            done();
          });
      });

      it('should return 404 not found', (done) => {
        // 5c9f8c64cae7314e3b9441d8
        request(app)
          .get('/api/categories/5c9f8c64cae7314e3b9441d8')
          .use(auth())
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({
              msg: 'Customer not found',
            });
            done();
          });
      });

      it('should return category', (done) => {
        request(app)
          .get(`/api/categories/${categoryId}`)
          .use(auth())
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(Object.keys(res.body)).to.have.members([
              '_id',
              'name',
              'description',
              '__v',
            ]);
            done();
          });
      });
    });

    describe('POST /api/categories', () => {
      it('should return 401 unauthorised', (done) => {
        request(app)
          .post('/api/categories')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.text).to.equal('Unauthorized');
            done();
          });
      });

      it('should return 400 bad request', (done) => {
        request(app)
          .post('/api/categories')
          .use(auth())
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });

      it('should return 201 created', (done) => {
        request(app)
          .post('/api/categories')
          .use(auth())
          .send({
            name: 'Category to Create',
            description: 'Test Creation of category',
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            done();
          });
      });
    });

    describe('PUT /api/categories/:id', () => {
      it('returns 401 unauthorised', (done) => {
        request(app)
          .put(`/api/categories/${categoryId}`)
          .send({
          })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.text).to.equal('Unauthorized');
            done();
          });
      });

      it('returns 400 bad request', (done) => {
        request(app)
          .put(`/api/categories/${categoryId}`)
          .use(auth())
          .send({ })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            done();
          });
      });


      it('returns 200 after udpate', (done) => {
        const categoryUpdate = {
          name: 'Updated Category Name',
          description: 'Updated Desc',
        };

        request(app)
          .put(`/api/categories/${categoryId}`)
          .use(auth())
          .send(categoryUpdate)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              ...categoryUpdate,
              _id: categoryId,
              __v: 0,
            });
            done();
          });
      });
    });

    describe('DELETE /api/categories/:id', () => {
      it('returns 401 unauthorized', (done) => {
        request(app)
          .delete(`/api/categories/${categoryId}`)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.text).to.equal('Unauthorized');
            done();
          });
      });

      it('returns 404 not found', (done) => {
        request(app)
          .delete('/api/categories/5c9f8c64cae7314e3b9441d8')
          .use(auth())
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({
              msg: 'Category not found',
            });
            done();
          });
      });

      it('returns 200 after delete', (done) => {
        request(app)
          .delete(`/api/categories/${categoryId}`)
          .use(auth())
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });

  describe('Menu', () => {
    let categoryId;
    let menuId;
    let optionId;

    const testCategory = {
      name: 'Test Category',
      description: 'Test category description',
    }
    const testMenu = {
      name: 'Menu Name',
      description: 'Menu Desc',
      price: 10,
      tags: 'menu, test, category, crud',
    };

    const testOption = {
      description: 'Test Menu Option',
      additionalCost: 0,
    };

    before((done) => {
      request(app)
        .post('/api/categories')
        .use(auth())
        .send(testCategory)
        .end((categoryErr, categoryRes) => {
          const { _id: categoryId_ } = categoryRes.body;
          categoryId = categoryId_;
          request(app)
            .post('/api/menus/')
            .use(auth())
            .send({
              ...testMenu,
              category: categoryId,
            })
            .end((menuErr, menuRes) => {
              const { _id } = menuRes.body;
              menuId = _id;
              request(app)
                .post(`/api/menus/${menuId}/options`)
                .use(auth())
                .send(testOption)
                .end((optionErr, optionRes) => {
                  const { _id: _optionId } = optionRes.body;
                  optionId = _optionId;
                  done();
                });
            });
        });
    });

    describe('GET /api/menus', () => {
      it('returns 401 unauthorised', (done) => {
        request(app)
          .get('/api/menus')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.text).to.equal('Unauthorized');
            done();
          });
      });
      it('returns 200 menu list', (done) => {
        request(app)
          .get('/api/menus')
          .use(auth())
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body)).to.equal(true);
            res.body.forEach((menu) => {
              expect(Object.keys(menu)).to.include.members([
                '_id',
                'name',
                'description',
                'price',
                'menuOptions',
              ]);
            });
            done();
          });
      });
    });

    describe('GET /api/menus/:id', () => {
      it('returns 401 unauthorised');
      it('returns 404 not found');
      it('returns 200 menu');
    });

    describe('GET /api/menus/category/:categoryId', () => {
      it('returns 401 unauthorised');
      it('returns 400 bad request for no category');
      it('returns 404 not found');
      it('returns 200 menu list');
    });

    describe('POST /api/menus/', () => {
      it('returns 401 unauthorised');
      it('returns 400 bad request');
      it('returns 201 menu');
    });

    describe('PUT /api/menus/:id', () => {
      it('returns 401 unauthorised');
      it('returns 400 bad request');
      it('returns 200 updated menu');
    });

    describe('DELETE /api/menus/:id', () => {
      it('returns 401 unauthorised');
      it('returns 404 not found');
    });


    describe('POST /api/menus/:id/options', () => {
      it('returns 401 unauthorised');
      it('returns 404 menu not found');
      it('returns 201 option added');
    });

    describe('DELETE /api/menus/:id/options/:optionId', () => {
      it('returns 401 unauthorised');
      it('returns 404 menu not found');
      it('returns 404 option not found');
      it('returns 200 option deleted');
    });
  });
});