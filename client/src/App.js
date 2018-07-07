import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import store from "./store";

import Landing from "./views/external/";
import Login from "./views/external/Login";
import Orders from "./views/orders/";
import TakeOrder from "./views/orders/take-order";

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
              <PrivateRoute exact path="/takeorder" component={TakeOrder} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
