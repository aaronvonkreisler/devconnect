import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import {
   Button,
   Container,
   Card,
   Grid,
   makeStyles,
   Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: '2rem',
   },
   card: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
   },
   cardTitle: {
      borderBottom: '#ccc 1px dotted',
      marginTop: '1rem',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      marginLeft: '0.5rem',
   },
   noExperience: {
      margin: theme.spacing(1),
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
                  <ProfileAbout profile={profile} />
                  <Grid container spacing={2}>
                     <Grid item xs={12} sm={6}>
                        <div>
                           <Card className={classes.card}>
                              <Typography
                                 variant="h5"
                                 color="primary"
                                 className={classes.cardTitle}
                              >
                                 Experience
                              </Typography>
                              <div>
                                 {profile.experience.length > 0 ? (
                                    <React.Fragment>
                                       {profile.experience.map((experience) => (
                                          <ProfileExperience
                                             key={experience._id}
                                             experience={experience}
                                          />
                                       ))}
                                    </React.Fragment>
                                 ) : (
                                    <div className={classes.noExperience}>
                                       <Alert variant="filled" severity="info">
                                          No Experience Credentials
                                       </Alert>
                                    </div>
                                 )}
                              </div>
                           </Card>
                        </div>
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <div>
                           <Card className={classes.card}>
                              <Typography
                                 variant="h5"
                                 color="primary"
                                 className={classes.cardTitle}
                              >
                                 Education
                              </Typography>
                              <div>
                                 {profile.education.length > 0 ? (
                                    <React.Fragment>
                                       {profile.education.map((education) => (
                                          <ProfileEducation
                                             key={education._id}
                                             education={education}
                                          />
                                       ))}
                                    </React.Fragment>
                                 ) : (
                                    <div className={classes.noExperience}>
                                       <Alert variant="filled" severity="info">
                                          No Education Credentials
                                       </Alert>
                                    </div>
                                 )}
                              </div>
                           </Card>
                        </div>
                     </Grid>
                  </Grid>
                  <div>
                     {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername} />
                     )}
                  </div>
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
