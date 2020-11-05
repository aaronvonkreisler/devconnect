import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {
   return (
      <Router>
         <Fragment>
            <CssBaseline>
               <Navbar />
               <Route exact path="/" component={Landing} />
               <Container style={{ marginTop: '2rem' }}>
                  <Switch>
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/login" component={Login} />
                  </Switch>
               </Container>
            </CssBaseline>
         </Fragment>
      </Router>
   );
};

export default App;
