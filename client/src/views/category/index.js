import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Categories from "./categories";
import Category from "./category";
import EditCategory from "./edit-category";

class CategoryIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/categories" component={Categories} />
        </Switch>
        <Route exact path="/categories/:id" component={Category} />
        <Route exact path="/categories/:id/edit" component={EditCategory} />
      </div>
    );
  }
}

export default CategoryIndex;
