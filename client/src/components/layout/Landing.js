import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';

const Landing = ({ isAuthenticated }) => {
   if (isAuthenticated) {
      return <Redirect to="/posts" />;
   }
   return (
      <React.Fragment>
         <CssBaseline />
         <section className="landing">
            <div className="dark-overlay">
               <div className="landing-inner">
                  <h1 className="x-large">Developer Connector</h1>
                  <p className="lead">
                     Create a developer profile/portfolio, share posts and get
                     help from other developers
                  </p>
                  <div className="btn-group">
                     <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/register"
                     >
                        Sign Up
                     </Button>
                     <Button
                        variant="contained"
                        style={{ marginLeft: '10px' }}
                        component={RouterLink}
                        to="/login"
                     >
                        Login
                     </Button>
                  </div>
               </div>
            </div>
         </section>
      </React.Fragment>
   );
};

Landing.propTypes = {
   isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
