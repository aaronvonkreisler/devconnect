import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import { Container, Typography } from '@material-ui/core';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
   useEffect(() => {
      getProfiles();
   }, [getProfiles]);
   return (
      <Container style={{ marginTop: '2rem' }}>
         {loading ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <Typography variant="h5">Developers</Typography>
               <Typography variant="body1">
                  Browse and connect with developers
               </Typography>
               <div>
                  {profiles.length > 0 ? (
                     profiles.map((profile) => (
                        <ProfileItem key={profile._id} profile={profile} />
                     ))
                  ) : (
                     <Typography variant="h6">No profiles found...</Typography>
                  )}
               </div>
            </React.Fragment>
         )}
      </Container>
   );
};

Profiles.propTypes = {
   getProfiles: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
