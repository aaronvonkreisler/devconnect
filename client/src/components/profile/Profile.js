import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Button, Container, Card, makeStyles } from '@material-ui/core';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: '2rem',
   },
}));

const Profile = ({
   match,
   getProfileById,
   profile: { profile, loading },
   auth,
}) => {
   const classes = useStyles();

   useEffect(() => {
      getProfileById(match.params.id);
   }, [getProfileById, match.params.id]);

   return (
      <Container className={classes.root}>
         <React.Fragment>
            {profile === null || loading ? (
               <Spinner />
            ) : (
               <React.Fragment>
                  <Button
                     variant="contained"
                     color="default"
                     component={RouterLink}
                     to="/profiles"
                  >
                     Back To Profiles
                  </Button>
                  {auth.isAuthenticated &&
                     auth.loading === false &&
                     auth.user._id === profile.user._id && (
                        <Button
                           variant="outlined"
                           component={RouterLink}
                           to="/edit-profile"
                        >
                           Edit Profile
                        </Button>
                     )}
                  <ProfileTop profile={profile} />
               </React.Fragment>
            )}
         </React.Fragment>
      </Container>
   );
};

Profile.propTypes = {
   getProfileById: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
   auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
