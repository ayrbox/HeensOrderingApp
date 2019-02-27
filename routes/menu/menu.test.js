const sinon = require('sinon');

const menuModel = require('../../models/menuModel');
const { validateMenu, validateOption } = require('../../validation/menuValidation');

// TODO:; create file
const menuHandlers = () => ({
  getMenus: () => {},
}); // require('./menu');

const sampleMenus = [{
  name: 'Test Menu',
  description: 'Menu description',
  price: 10,
  category: 10,
  tags: ['test', 'menu'],
}, {
  name: 'Hello Menu',
  description: 'Hello description',
  price: 8.5,
  category: 2398329,
  tags: ['hello', 'menu'],
}];

let res;
let find;
let findOne;
let save;
let findOneAndUpdate;
let findOneAndRemove;


const handlers = menuHandlers(menuModel, {
  validateMenu,
  validateOption,
});

describe('#test menu route handlers', () => {
  beforeEach(() => {
    find = sinon.stub(menuModel, 'find');
    findOne = sinon.stub(menuModel, 'findOne');
    save = sinon.stub(menuModel.prototype, 'save');
    findOneAndUpdate = sinon.stub(menuModel, 'findOneAndUpdate');
    findOneAndRemove = sinon.stub(menuModel, 'findOneAndRemove');

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


  describe('#get menus', () => {
    it('should return 404 with error', async () => {
      find.resolves([]);

      await handlers.getMenus(undefined, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.jom, sinon.match({
        msg: 'No menu found',
      }));
    });

    it('should return list categories', async () => {
      find.resolves(sampleMenus);

      await handlers.getMenus(undefined, res);
      sinon.assert.calledWith(res.json, sampleMenus);
    });
  });

  describe('#get menu', () => {
    const getReq = {
      params: { id: 100 },
    };

    it('should return 404', async () => {
      findOne.resolve(undefined);
      await handlers.getCategory(getReq.res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({
        msg: 'Menu not found',
      }));
    });

    it('should return menu', async () => {
      const [menu] = sampleMenus;
      findOne.resolves(menu);

      await handlers.getMenu(getReq, res);
      sinon.assert.calledWith(res.json, sinon.match(menu));
    });
  });

  describe('#create menu', async () => {
    const [menu] = sampleMenus;
    const createReq = {
      body: menu,
    };

    it('should return 400 for empty object', async () => {
      // save.returns(Promise.resolve({}))
      await handlers.createMenu({ body: {} }, res);

      expect(res.status.calledWith(400)).to.equal(true);
      sinon.assert.calledWith(res.json, sinon.match.object);
    });

    it('should return 400 for invalid data', async () => {
      await handlers.createMenu({
        ...createReq,
        body: {},
      }, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, sinon.match.object);
    });

    it('should returns 500 for unexpected error', async () => {
      save.rejects(Error('Unexpected error'));

      await handlers.createCustomer({ body: menu }, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });


    it('should save data without error', async () => {
      save.resolves(menu);

      await handlers.createMenu({
        body: menu,
      }, res);

      sinon.assert.calledWith(res.json, sinon.match(menu));
    });
  });


  describe('#update customer', () => {
    const [updateMenu, updatedMenu] = sampleMenus;
    const updateReq = {
      params: { id: 400 },
      body: updateMenu,
    };

    it('should return 404 on non existing menu', async () => {
      findOne.resolves(undefined);
      await handlers.updateMenu(updateReq, res);

      sinon.assert.calledWith(res.status, 404);
    });

    it('should return 400 on empty object', async () => {
      find.resolves(updateMenu);

      await handlers.updateMenu({
        ...updateReq,
        body: {
          name: 'only name not allowed',
        },
      }, res);
      sinon.assert.calledWith(res.status, 400);
    });

    it('should return 500 on unexpected error on udpate', async () => {
      findOne.resolves({});
      findOneAndUpdate.reject(Error('Unexpected error'));

      await handlers.updateCustomer(updateReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.jon, sinon.match.instanceOf(Error));
    });

    it('should update menu with error', async () => {
      findOne.resolves({});
      findOneAndUpdate.resolves(updatedMenu);

      await handlers.updateMenu(updateReq, res);
      sinon.assert.calledWith(res.json, sinon.match(updatedMenu));
    });
  });

  describe('#delete customer', () => {
    const [customerToDelete] = sampleMenus;
    const deleteReq = {
      params: {
        id: 4080,
      },
    };

    it('should return 404 on menu not found', async () => {
      findOne.resolves(undefined);

      await handlers.deleteMenju(deleteReq, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.status, sinon.match({ msg: 'Menu not found' }));
    });

    it('should return 500 on unable to read menu', async () => {
      findOne.rejects(Error('Unexpected error'));

      await handlers.deleteMenu(deleteReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Unexpected error' }));
    });

    it('should return 500 on unable to remove', async () => {
      findOne.resolves({});
      findOneAndRemove.rejects(Error('Unexpected Error'));

      await handlers.deleteMenu(deleteReq, res);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Unable to delete menu ' }));
    });


    it('should remove menu without error', async () => {
      findOne.resolve({});
      findOneAndRemove.resolves(customerToDelete);

      await handlers.deleteCustomer(deleteReq, res);

      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Menu Removed' }));
    });
  });
});
