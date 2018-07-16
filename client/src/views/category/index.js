import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Categories from "./categories";
import Category from "./category";
import EditCategory from "./edit-category";
import AddCategory from "./add-category";
import DeleteCategory from "./delete-category";

class CategoryIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/categories" component={Categories} />
        </Switch>
        <Switch>
          <Route exact path="/categories/add" component={AddCategory} />
          <Route exact path="/categories/:id" component={Category} />
          <Route exact path="/categories/:id/edit" component={EditCategory} />
          <Route
            exact
            path="/categories/:id/delete"
            component={DeleteCategory}
          />
        </Switch>
      </div>
    );
  }
}

export default CategoryIndex;
