import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Typography, Button } from '@material-ui/core';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Education from './Education';
import Experience from './Experience';
import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';
import AccountCircle from '@material-ui/icons/AccountCircle';

const Dashboard = ({
   getCurrentProfile,
   deleteAccount,
   auth: { user },
   profile: { profile, loading },
}) => {
   useEffect(() => {
      getCurrentProfile();
   }, [getCurrentProfile]);

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
                  <Experience experience={profile.experience} />
                  <Education education={profile.education} />
                  <div className="my-2">
                     <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AccountCircle />}
                        onClick={() => deleteAccount()}
                     >
                        Delete Account
                     </Button>
                  </div>
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
   deleteAccount: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
   Dashboard
);
