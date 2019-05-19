import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

import PrivateRoute from './components/PrivateRoute';
import store from './store';
import { heens } from './theme';
import GlobalStyle from './components/GlobalStyle';

// @views
import Landing from './views/external';
import Login from './views/external/Login';
import Orders from './views/orders';
import CustomerIndex from './views/customers';
import CategoryIndex from './views/category';
import MenuIndex from './views/menus';
import TakeOrderIndex from './views/takeOrder';

// actions
import getToken from './utils/get-token';

// check the token
getToken();


// class App extends Component {
const App = () => (
  <MuiThemeProvider theme={heens}>
    <GlobalStyle />
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute path="/orders" component={Orders} />
            <PrivateRoute path="/takeorder" component={TakeOrderIndex} />
            <PrivateRoute path="/customers" component={CustomerIndex} />
            <PrivateRoute path="/categories" component={CategoryIndex} />
            <PrivateRoute path="/menus" component={MenuIndex} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default App;
