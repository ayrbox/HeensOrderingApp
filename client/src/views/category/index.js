import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Categories from "./categories";
import Category from "./category";

class CategoryIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/categories" component={Categories} />
        </Switch>
        <Route path="/categories/:id" component={Category} />
      </div>
    );
  }
}

export default CategoryIndex;
