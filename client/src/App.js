import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import './styles/_app.scss';
import Alert from './components/layout/Alert';

import Dashboard from './components/dashboard/Dashboard';

import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Navigation from './components/layout/Navigation';
import PrivateRoute from './components/routing/PrivateRoute';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import Profile from './components/profilev2/Profile';
import Profiles from './components/profiles/Profiles';
import Register from './components/auth/Register';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

if (localStorage.token) {
   setAuthToken(localStorage.token);
}

const App = () => {
   useEffect(() => {
      store.dispatch(loadUser());
      // log out user from all tabs if tey logged out in one tab or token expires
      window.addEventListener('storage', () => {
         if (!localStorage.token) {
            store.dispatch({ type: LOGOUT });
         }
      });
   }, []);

   return (
      <Provider store={store}>
         <Router>
            <Fragment>
               <Alert />
               <Switch>
                  <Route exact path="/" component={Landing} />

                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Navigation>
                     <PrivateRoute
                        exact
                        path="/profile/:id"
                        component={Profile}
                     />
                     <PrivateRoute
                        exact
                        path="/profiles"
                        component={Profiles}
                     />
                     <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                     />
                     <PrivateRoute exact path="/posts" component={Posts} />
                     <PrivateRoute exact path="/posts/:id" component={Post} />
                  </Navigation>
               </Switch>
            </Fragment>
         </Router>
      </Provider>
   );
};

export default App;
