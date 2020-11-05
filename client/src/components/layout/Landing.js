import React from 'react';
import { Button } from '@material-ui/core';

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
                     href="register.html"
                  >
                     Sign Up
                  </Button>
                  <Button
                     variant="contained"
                     href="login.html"
                     style={{ marginLeft: '10px' }}
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
