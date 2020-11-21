import React, { useEffect, useState } from 'react';
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
import CreateProfile from '../profilev2/forms/CreateProfile';

const Dashboard = ({
   getCurrentProfile,
   deleteAccount,
   auth: { user },
   profile: { profile, loading },
}) => {
   const [onCreateOpen, setOnCreateOpen] = useState(false);

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
                     onClick={() => setOnCreateOpen(true)}
                     color="primary"
                     variant="contained"
                  >
                     Create Profile
                  </Button>
                  <React.Fragment>
                     <CreateProfile
                        onCreateOpen={onCreateOpen}
                        setOnCreateOpen={setOnCreateOpen}
                     />
                  </React.Fragment>
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
