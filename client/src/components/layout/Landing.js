import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Landing = () => {
   return (
      <section className="landing">
         <div className="dark-overlay">
            <div className="landing-inner">
               <h1 className="x-large">Developer Connector</h1>
               <p className="lead">
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
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
   );
};

export default Landing;
