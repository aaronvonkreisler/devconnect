import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { getProfileById } from '../../actions/profile';
import { getUsersPosts } from '../../actions/selectedUser.js';
import Spinner from '../layout/Spinner';
import UserCard from './UserCard';
import ProfileTabs from './views/ProfileTabs';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   card: {
      marginLeft: theme.spacing(2),
   },
}));

const Profile = ({
   match,
   getProfileById,
   getUsersPosts,
   profile: { profile, loading },
   auth,
   selectedUser: { posts },
   history,
}) => {
   const classes = useStyles();

   useEffect(() => {
      getProfileById(match.params.id, history, auth.user._id);
      getUsersPosts(match.params.id);
   }, [getProfileById, match.params.id, auth.user._id, history, getUsersPosts]);

   return (
      <React.Fragment>
         {profile === null || loading ? (
            <Spinner />
         ) : (
            <div className={classes.root}>
               <Grid container spacing={1} direction="row">
                  <Grid
                     item
                     xs={12}
                     sm={12}
                     md={4}
                     lg={3}
                     xl={3}
                     className={classes.card}
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
                     className={classes.card}
                  >
                     <ProfileTabs />
                  </Grid>
               </Grid>
            </div>
         )}
      </React.Fragment>
   );
};

Profile.propTypes = {
   getProfileById: PropTypes.func.isRequired,
   getUsersPosts: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
   profile: state.profile,
   selectedUser: state.selectedUser,
});

export default connect(mapStateToProps, { getProfileById, getUsersPosts })(
   withRouter(Profile)
);
