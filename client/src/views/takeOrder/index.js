import React from "react";
import { Switch, Route } from "react-router-dom";
import OrderDetail from "./order-detail";
import OrderType from "./order-type";
import SelectMenuItem from "./select-menu-item";

const TakeOrderIndex = () => (
  <div>
    <Switch>
      <Route path="/takeorder" component={OrderDetail} />
    </Switch>
    <Switch>
      <Route path="/takeorder/type" component={OrderType} />
      <Route path="/takeorder/options" component={SelectMenuItem} />
    </Switch>
  </div>
);

export default TakeOrderIndex;
