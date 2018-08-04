import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import store from "./store";

//@views
import Landing from "./views/external/";
import Login from "./views/external/Login";
import Orders from "./views/orders/";
import TakeOrder from "./views/orders/take-order";
import CustomerIndex from "./views/customers/";
import AddCustomer from "./views/customers/add-customer";
import CustomerDetail from "./views/customers/customer-detail";
import EditCustomer from "./views/customers/edit-customer";
import CategoryIndex from "./views/category";
import MenuIndex from "./views/menus";
import TakeOrderSelectMenu from "./views/orders/take-order-selectmenu";

import { getToken } from "./utils/get-token";

//check the token
getToken();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app-container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />

            <Switch>
              <PrivateRoute exact path="/orders" component={Orders} />
              <PrivateRoute path="/takeorder" component={TakeOrder} />
              <PrivateRoute exact path="/customers" component={CustomerIndex} />
            </Switch>
            <Switch>
              <PrivateRoute
                path="/takeorder/options"
                component={TakeOrderSelectMenu}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/customers/add"
                component={AddCustomer}
              />
              <PrivateRoute
                exact
                path="/customers/:id"
                component={CustomerDetail}
              />
              <PrivateRoute
                exact
                path="/customer/:id/edit"
                component={EditCustomer}
              />
            </Switch>
            <Switch>
              <PrivateRoute path="/categories" component={CategoryIndex} />
            </Switch>
            <Switch>
              <PrivateRoute path="/menus" component={MenuIndex} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
