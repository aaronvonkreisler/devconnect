import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import { getProfileById } from '../../actions/profile';
import { getUsersLikedPosts } from '../../actions/profile.js';
import Spinner from '../layout/Spinner';
import UserCard from './UserCard';
import ProfileTabs from './views/ProfileTabs';
import GithubLayout from './github/GithubLayout';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   card: {
      marginLeft: theme.spacing(2),
   },
   repos: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
   },
}));

const Profile = ({
   match,
   getProfileById,
   getUsersLikedPosts,
   profile: { profile, loading },
   post: { posts },
   auth,
   history,
}) => {
   const classes = useStyles();
   const theme = useTheme();
   const mediumDevice = useMediaQuery(theme.breakpoints.up('md'));

   useEffect(() => {
      getUsersLikedPosts(match.params.id);
   }, [match.params.id, history, getUsersLikedPosts]);

   useEffect(() => {
      if (auth.user) {
         getProfileById(match.params.id, history, auth.user._id);
      }
   }, [auth, getProfileById, match.params.id, history]);

   return (
      <React.Fragment>
         {profile === null || loading ? (
            <Spinner />
         ) : (
            <div className={classes.root}>
               <Grid container direction="row">
                  <Grid
                     item
                     xs={12}
                     sm={12}
                     md={4}
                     lg={3}
                     xl={2}
                     className={mediumDevice ? classes.card : ''}
                  >
                     <UserCard
                        profile={profile}
                        user={auth.user}
                        loading={loading}
                        posts={posts}
                        auth={auth}
                     />
                  </Grid>
                  <Grid
                     item
                     xs={12}
                     sm={12}
                     md={7}
                     lg={8}
                     xl={9}
                     className={mediumDevice ? classes.card : ''}
                  >
                     <ProfileTabs />
                  </Grid>
                  <Grid item xs={12} className={classes.repos}>
                     <div>
                        {profile.githubusername && (
                           <GithubLayout username={profile.githubusername} />
                        )}
                     </div>
                  </Grid>
               </Grid>
            </div>
         )}
      </React.Fragment>
   );
};

Profile.propTypes = {
   getProfileById: PropTypes.func.isRequired,

   getUsersLikedPosts: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
   profile: state.profile,
   post: state.post,
});

export default connect(mapStateToProps, {
   getProfileById,

   getUsersLikedPosts,
})(withRouter(Profile));
