import React, { useEffect, useState } from 'react';

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
import EditProfile from '../profilev2/forms/EditProfile';
import AddExperience from '../profilev2/forms/AddExperience';
import AddEducation from '../profilev2/forms/AddEducation';

const Dashboard = ({
   getCurrentProfile,
   deleteAccount,
   auth: { user },
   profile: { profile, loading },
}) => {
   const [onCreateOpen, setOnCreateOpen] = useState(false);
   const [onEditOpen, setOnEditOpen] = useState(false);
   const [onExperienceOpen, setOnExperienceOpen] = useState(false);
   const [onEducationOpen, setOnEducationOpen] = useState(false);

   useEffect(() => {
      getCurrentProfile();
   }, [getCurrentProfile]);

   return loading && profile === null ? (
      <Spinner />
   ) : (
      <Container>
         <React.Fragment>
            <Typography variant="h5">Welcome {user && user.name}!</Typography>
            {profile !== null ? (
               // User has a profile -- render dashboard
               <React.Fragment>
                  <DashboardActions
                     setOnEditOpen={setOnEditOpen}
                     setOnExperienceOpen={setOnExperienceOpen}
                     setOnEducationOpen={setOnEducationOpen}
                  />
                  <EditProfile
                     onEditOpen={onEditOpen}
                     setOnEditOpen={setOnEditOpen}
                  />
                  <AddExperience
                     onExperienceOpen={onExperienceOpen}
                     setOnExperienceOpen={setOnExperienceOpen}
                  />
                  <AddEducation
                     onEducationOpen={onEducationOpen}
                     setOnEducationOpen={setOnEducationOpen}
                  />
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
