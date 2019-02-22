const { expect } = require('chai');
const sinon = require('sinon');

const categoryModel = require('../../models/categoryModel');
const { validateCategory } = require('../../validation/categoryValidation');
const categoryHandlers = require('./category.js');


const sampleCategories = [
  { name: 'test', description: 'askdfljasldfas' },
  { name: 'hello', description: 'hellaskdfjla' },
];

let res;
let find;
let findOne;
let save;
let findOneAndUpdate;
let findOneAndRemove;

const handlers = categoryHandlers(categoryModel, validateCategory);

describe('#test cateogry handlers', () => {
  beforeEach(() => {
    find = sinon.stub(categoryModel, 'find');
    findOne = sinon.stub(categoryModel, 'findOne');
    save = sinon.stub(categoryModel.prototype, 'save');
    findOneAndUpdate = sinon.stub(categoryModel, 'findOneAndUpdate');
    findOneAndRemove = sinon.stub(categoryModel, 'findOneAndRemove');

    res = {
      status: sinon.spy(),
      json: sinon.spy(),
    };
  });

  afterEach(() => {
    find.restore();
    findOne.restore();
    save.restore();
    findOneAndUpdate.restore();
    findOneAndRemove.restore();
  });

  describe('#get categories', () => {
    it('should return 404 with error', async () => {
      find.returns(Promise.resolve([]));

      await handlers.getCategories(undefined, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({
        msg: 'No categories found',
      }));
    });


    it('should return list categories', async () => {
      find.returns(Promise.resolve(sampleCategories));

      await handlers.getCategories(undefined, res);
      sinon.assert.calledWith(res.json, sampleCategories);
    });
  });

  describe('#get category', () => {
    const getReq = {
      params: {
        id: 100,
      },
    };

    it('should return 404', async () => {
      findOne.returns(Promise.resolve(undefined));
      await handlers.getCategory(getReq, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({
        msg: 'Category not found',
      }));
    });

    it('should return category', async () => {
      const [category] = sampleCategories;
      findOne.returns(Promise.resolve(category));

      await handlers.getCategory(getReq, res);
      sinon.assert.calledWith(res.json, sinon.match(category));
    });
  });

  describe('#create category', () => {
    const [category] = sampleCategories;
    const createReq = {
      body: category,
    };

    it('should return 400 for invalid data', async () => {
      await handlers.createCategory({
        ...createReq,
        body: {},
      }, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, sinon.match.object);
    });

    it('should return 500 error', async () => {
      save.returns(Promise.reject(Error('Unexpected Error')));
      await handlers.createCategory(createReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });

    it('should return 201 with categoty created', async () => {
      save.returns(Promise.resolve(category));
      await handlers.createCategory(createReq, res);

      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.json, sinon.match(category));
    });
  });

  describe('#update category', () => {
    const [updateCategory, updatedCategory] = sampleCategories;
    const updateReq = {
      params: { id: 200 },
      body: updateCategory,
    };

    it('should return 404 non existing user', async () => {
      findOne.returns(Promise.resolve(undefined));
      await handlers.updateCategory(updateReq, res);

      sinon.assert.calledWith(res.status, 404);
    });

    it('should return 400 on empty object', async () => {
      findOne.returns(Promise.resolve(updateCategory));
      await handlers.updateCategory({ ...updateReq, body: {} }, res);

      sinon.assert.calledWith(res.status, 400);
    });

    it('should return 400 on invalid data', async () => {
      findOne.returns(Promise.resolve(updateCategory));
      await handlers.updateCategory({
        ...updateReq,
        body: {
          description: 'Only description is not enough',
        },
      }, res);
      sinon.assert.calledWith(res.status, 400);
    });

    it('should return 500 on unexpected error on update', async () => {
      findOne.returns(Promise.resolve({}));
      findOneAndUpdate.returns(Promise.reject(Error('Unexpected error')));

      await handlers.updateCategory(updateReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });

    it('should update data without error', async () => {
      findOne.returns(Promise.resolve({}));
      findOneAndUpdate.returns(Promise.resolve(updatedCategory));

      await handlers.updateCategory(updateReq, res);
      sinon.assert.calledWith(res.json, sinon.match(updatedCategory));
    });
  });

  describe('#delete category', () => {
    it('should return 404 on customer not found');

    it('should return 500 on unable to read customer');

    it('should return 500 on unable to remove');

    it('should remove customer without error');
  });
});
