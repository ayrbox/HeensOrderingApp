import React from "react";
import { Switch, Route } from "react-router-dom";

//@views
import OrderList from "./order-list";

const OrderIndex = () => {
  return (
    <div>
      <Switch>
        <Route path="/orders/" component={OrderList} />
      </Switch>
    </div>
  );
};

export default OrderIndex;
