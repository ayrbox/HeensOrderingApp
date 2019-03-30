const sinon = require('sinon');

const menuModel = require('../../models/menuModel');
const { validateMenu, validateOption } = require('../../validation/menuValidation');

const menuHandlers = require('./menu');

const sampleMenus = [{
  name: 'Test Menu',
  description: 'Menu description',
  price: 10,
  category: 'TestCategory',
  tags: 'test,menu',
}, {
  name: 'Hello Menu',
  description: 'Hello description',
  price: 8.5,
  category: 'HelloCategory',
  tags: 'hello,menu',
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
      find.returns({
        populate: () => Promise.resolve([]),
      });

      await handlers.getMenus(undefined, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({
        msg: 'Menus not found',
      }));
    });

    it('should return list categories', async () => {
      find.returns({
        populate: () => Promise.resolve(sampleMenus),
      });

      await handlers.getMenus(undefined, res);
      sinon.assert.calledWith(res.json, sampleMenus);
    });
  });

  describe('#get menus by category', () => {
    const req = {
      params: {
        categoryId: 100,
      },
    };

    it('should return 404', async () => {
      find.resolves([]);

      await handlers.getMenusByCategory(req, res);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({
        msg: 'No menu in category',
      }));
    });

    it('should return 500 on unexpected read error', async () => {
      find.rejects(Error('Unexpected Error'));
      await handlers.getMenusByCategory(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });

    it('should return array of menus', async () => {
      find.resolves(sampleMenus);
      await handlers.getMenusByCategory(req, res);
      sinon.assert.calledWith(res.json, sampleMenus);
    });
  });

  describe('#get menu', () => {
    const getReq = {
      params: { id: 100 },
    };

    it('should return 404', async () => {
      findOne.returns({
        populate: () => Promise.resolve(undefined),
      });
      await handlers.getMenu(getReq, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({
        msg: 'Not found',
      }));
    });

    it('should return menu', async () => {
      const [menu] = sampleMenus;
      findOne.returns({
        populate: () => Promise.resolve(menu),
      });

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
      save.returns(Promise.resolve({}));
      await handlers.createMenu({ body: {} }, res);

      sinon.assert.calledWith(res.status, 400);
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

      await handlers.createMenu({ body: menu }, res);

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


  describe('#update menu', () => {
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
      findOneAndUpdate.rejects(Error('Unexpected error'));

      await handlers.updateMenu(updateReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });

    it('should update menu without error', async () => {
      findOne.resolves({});
      findOneAndUpdate.resolves(updatedMenu);

      await handlers.updateMenu(updateReq, res);
      sinon.assert.calledWith(res.json, sinon.match(updatedMenu));
    });
  });

  describe('#delete menu', () => {
    const [customerToDelete] = sampleMenus;
    const deleteReq = {
      params: {
        id: 4080,
      },
    };

    it('should return 404 on menu not found', async () => {
      findOne.resolves(undefined);

      await handlers.deleteMenu(deleteReq, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Menu not found' }));
    });

    it('should return 500 on unable to read menu', async () => {
      findOne.rejects(Error('Unexpected error'));

      await handlers.deleteMenu(deleteReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });

    it('should return 500 on unable to remove', async () => {
      findOne.resolves({});
      findOneAndRemove.rejects(Error('Unexpected Error'));

      await handlers.deleteMenu(deleteReq, res);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });


    it('should remove menu without error', async () => {
      findOne.resolves({});
      findOneAndRemove.resolves(customerToDelete);

      await handlers.deleteMenu(deleteReq, res);

      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Menu removed' }));
    });
  });


  describe('#addOption', () => {
    const [menuToAddOption] = sampleMenus;
    const addOptionReq = {
      params: { id: 100 },
      body: {
        description: 'Menu Option 1',
        additionalCost: 1,
      },
    };

    it('should return 400 for empty object', async () => {
      await handlers.addOption({ body: {} }, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, sinon.match.object);
    });

    it('should return 404 if menu not found', async () => {
      findOne.resolves(undefined);
      await handlers.addOption(addOptionReq, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match.object);
    });

    it('should return 500 on unexpected error', async () => {
      findOne.rejects(Error('Unexpected Error'));
      await handlers.addOption(addOptionReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });

    it('should addOption to the menu', async () => {
      findOne.resolves({
        ...menuToAddOption,
        menuOptions: [],
        save: () => Promise.resolve({
          ...menuToAddOption,
          menuOptions: [{
            description: 'Menu Option 1',
            additionalCost: 1,
          }],
        }),
      });
      await handlers.addOption(addOptionReq, res);
      sinon.assert.calledWith(res.json, sinon.match({
        ...menuToAddOption,
        menuOptions: [{
          description: 'Menu Option 1',
          additionalCost: 1,
        }],
      }));
    });
  });

  describe('#deleteOption', () => {
    const [menuToDeleteOption] = sampleMenus;
    const deleteOptionReq = {
      params: {
        id: 100,
        optionId: 1,
      },
    };

    it('returns 404 error if not found', async () => {
      findOne.resolves(undefined);
      await handlers.deleteOption(deleteOptionReq, res);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({
        msg: 'Menu not found',
      }));
    });

    it('returns 404 on option not found', async () => {
      findOne.resolves({
        ...menuToDeleteOption,
        menuOptions: [],
      });

      await handlers.deleteOption(deleteOptionReq, res);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({
        msg: 'Option not found',
      }));
    });

    it('returns 404 on option not found', async () => {
      findOne.resolves({
        ...menuToDeleteOption,
        menuOptions: [{
          id: 1,
          description: 'Option to delete',
          additionalCost: 2,
        }, {
          id: 2,
          descriptin: 'Option 2 delete',
          additionalCost: 0,
        }],
        save: () => Promise.resolve(menuToDeleteOption),
      });
      await handlers.deleteOption(deleteOptionReq, res);
      sinon.assert.calledWith(res.json, sinon.match(menuToDeleteOption));
    });
  });
});
