import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './routes/Routes';
import PrivateRoute from './routes/PrivateRoute';
// import Dashboard from './Pages/Dashboard';

// Views
import UserProfile from './views/Profiles/UserProfile';
import FocusProfile from './views/Profiles/FocusProfile';
import EditProfile from './views/Profiles/EditProfile';
import Users from './views/Users';
import Home from './views/Home';

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
