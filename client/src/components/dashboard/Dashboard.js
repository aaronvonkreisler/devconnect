import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Typography, Button } from '@material-ui/core';
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';

const Dashboard = ({
   getCurrentProfile,
   auth: { user },
   profile: { profile, loading },
}) => {
   useEffect(() => {
      getCurrentProfile();
   }, []);

   return loading && profile === null ? (
      <Spinner />
   ) : (
      <Container style={{ marginTop: '2rem' }}>
         <React.Fragment>
            <Typography variant="h5">Welcome {user && user.name}!</Typography>
            {profile !== null ? (
               // User has a profile -- render dashboard
               <React.Fragment>
                  <DashboardActions />
               </React.Fragment>
            ) : (
               // User does not have a profile yet - render this
               <React.Fragment>
                  <p>You have not yet setup a profile, please add some info</p>
                  <Button
                     component={RouterLink}
                     to="/create-profile"
                     color="primary"
                     variant="contained"
                  >
                     Create Profile
                  </Button>
               </React.Fragment>
            )}
         </React.Fragment>
      </Container>
   );
};

Dashboard.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
   profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
