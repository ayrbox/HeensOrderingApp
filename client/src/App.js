import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import store from "./store"; //TODO: GET REDUX STORE

import Landing from "./views/external/";
import Login from "./views/external/Login";
import Orders from "./views/orders/";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app-container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
            </Switch>
            <Switch>
              <PrivateRoute path="/orders" component={Orders} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
