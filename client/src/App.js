import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Dashboard routes
import Routes from './routes/Routes';
// Pages
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Dashboard from './Pages/Dashboard';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import setAuthToken from './utils/setAuthToken';

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
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          {/* Dashboard HOC for nested routes / authenticated users */}
          <Dashboard>
            <Route component={Routes} />
          </Dashboard>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
