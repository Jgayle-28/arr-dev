import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './redux/actions/authActions';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './routes/PrivateRoute';

// Components
// import Alert from './components/Alert';

// Pages
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Dashboard from './Pages/Dashboard';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

// Check for JWT token in local storage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    console.log('USE EFFECT RAN');
    // setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Alert /> */}
          <Route exact path='/' component={LoginPage} />
          <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/profile' component={Dashboard} />
            <PrivateRoute exact path='/users' component={Dashboard} />
            <Route exact path='/register' component={RegisterPage} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
