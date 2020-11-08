import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import './styles/_app.scss';
import Alert from './components/layout/Alert';
import CreateProfile from './components/profile-form/CreateProfile';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import Register from './components/auth/Register';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
   setAuthToken(localStorage.token);
}

const App = () => {
   useEffect(() => {
      store.dispatch(loadUser());
   }, []);

   return (
      <Provider store={store}>
         <Router>
            <Fragment>
               <CssBaseline>
                  <Navbar />
                  <Route exact path="/" component={Landing} />

                  <Alert />
                  <Switch>
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/login" component={Login} />

                     <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                     />
                     <PrivateRoute
                        exact
                        path="/create-profile"
                        component={CreateProfile}
                     />
                  </Switch>
               </CssBaseline>
            </Fragment>
         </Router>
      </Provider>
   );
};

export default App;
