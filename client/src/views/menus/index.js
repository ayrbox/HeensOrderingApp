import React from 'react';
import { Switch, Route } from 'react-router-dom';

// views
import MenuList from './menu-list';
import AddMenu from './add-menu';
import EditMenu from './edit-menu';
import DeleteMenu from './delete-menu';
import Menu from './menu';
import AddMenuOption from './add-menu-option';

const MenuIndex = () => (
  <div>
    <Switch>
      <Route path="/menus" component={MenuList} />
    </Switch>
    <Switch>
      <Route exact path="/menus/add" component={AddMenu} />
      <Route exact path="/menus/:id" component={Menu} />
      <Route exact path="/menus/:id/edit" component={EditMenu} />
      <Route exact path="/menus/:id/delete" component={DeleteMenu} />
      <Route exact path="/menus/:id/options/add" component={AddMenuOption} />
    </Switch>
  </div>
);

export default MenuIndex;
