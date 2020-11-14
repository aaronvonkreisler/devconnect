import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import UserCard from './UserCard';

const Profile = ({
   match,
   getProfileById,
   profile: { profile, loading },
   auth,
}) => {
   useEffect(() => {
      getProfileById(match.params.id);
   }, [getProfileById, match.params.id]);
   return (
      <React.Fragment>
         {profile === null || loading ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <UserCard profile={profile} />
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

Profile.propTypes = {
   getProfileById: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
   profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
