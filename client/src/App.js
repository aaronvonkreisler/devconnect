import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import './styles/_app.scss';
import Alert from './components/layout/Alert';
import AddEducation from './components/profile-form/AddEducation';
import AddExperience from './components/profile-form/AddExperience';
import CreateProfile from './components/profile-form/CreateProfile';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/profile-form/EditProfile';
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
                     <PrivateRoute
                        exact
                        path="/create-profile"
                        component={CreateProfile}
                     />
                     <PrivateRoute
                        exact
                        path="/edit-profile"
                        component={EditProfile}
                     />
                     <PrivateRoute
                        exact
                        path="/add-experience"
                        component={AddExperience}
                     />
                     <PrivateRoute
                        exact
                        path="/add-education"
                        component={AddEducation}
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
