import React from "react";
import { Switch, Route } from "react-router-dom";

//views
import MenuList from "./menu-list";
import AddMenu from "./add-menu";

const MenuIndex = () => (
  <div>
    <Switch>
      <Route path="/menus" component={MenuList} />
    </Switch>
    <Switch>
      <Route exact path="/menus/add" component={AddMenu} />
      <Route exact path="/menus/:id" render={() => <h1>View</h1>} />
      <Route exact path="/menus/:id/edit" render={() => <h1>Edit</h1>} />
      <Route exact path="/menus/:id/delete" render={() => <h1>Delete</h1>} />
    </Switch>
  </div>
);

export default MenuIndex;
