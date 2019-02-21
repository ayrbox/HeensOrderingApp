const { expect } = require('chai');
const sinon = require('sinon');

const categoryHandlers = require('./index.js');

describe('#test cateogry handlers', () => {
  describe('#get categories', () => {
    it('should return 404 with error', async () => {
      const mockCategory = {
        find: sinon.fake.resolves([]),
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const handler = categoryHandlers(mockCategory);
      await handler.getCategories(undefined, res);

      expect(res.status.calledWith(404)).to.equal(true);
      expect(res.json.calledWith({
        msg: 'No categories found',
      })).to.equal(true);
    });


    it('should return list categories', async () => {
      const sampleCategories = [
        { name: 'test', description: 'askdfljasldfas' },
        { name: 'hello', description: 'hellaskdfjla' },
      ];

      const mockCategory = {
        find: sinon.fake.resolves(sampleCategories),
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const handler = categoryHandlers(mockCategory);
      await handler.getCategories(undefined, res);
      expect(res.json.calledWith(sampleCategories)).to.equal(true);
    });
  });

  describe('#get category', () => {
    it('should return 404', async () => {
      const mockCategory = {
        findOne: sinon.fake.resolves(undefined),
      };
      const req = { params: { id: 100 } };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };
      await categoryHandlers(mockCategory).getCategory(req, res);
      expect(res.status.calledWith(404)).to.equal(true);
      expect(res.json.calledWith({
        msg: 'Category not found',
      })).to.equal(true);
    });

    it('should return category', async () => {
      const sampleCategory = {
        name: 'CategoryName',
        description: 'Long category description',
      };
      const fakeCategory = {
        findOne: sinon.fake.resolves(sampleCategory),
      };
      const req = { params: { id: 100 } };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };
      await categoryHandlers(fakeCategory).getCategory(req, res);
      expect(res.json.calledWith(sampleCategory)).to.equal(true);
    });
  });

  describe('#create category', () => {
    it('should invalidate the post data', async () => {
      const fakeCategoryValidator = sinon.fake.returns({
        errors: { msg: 'test error msg' },
        isValid: false,
      });

      const req = { body: {} };
      const res = {
        status: sinon.spy(),
        json: sinon.spy(),
      };

      await categoryHandlers({}, fakeCategoryValidator)
        .createCategory(req, res);

      expect(res.status.calledWith(400)).to.equal(true);
      expect(res.json.calledWith({
        msg: 'test error msg',
      })).to.equal(true);
    });

    it('should return 500 error');

    it('should return 201 with categoty created');
  })

  describe('#update category', () => {

  });

  describe('#delete category', () => {

  });
});
