import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Typography, makeStyles, Card } from '@material-ui/core';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import UserCard from './UserCard';

const useStyles = makeStyles((theme) => ({
   card: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
   },
}));

const Profile = ({
   match,
   getProfileById,
   profile: { profile, loading },
   auth: { user },
   history,
}) => {
   const classes = useStyles();

   useEffect(() => {
      getProfileById(match.params.id, history);
   }, [getProfileById, match.params.id, history]);

   return (
      <React.Fragment>
         {profile === null || loading ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <Grid container>
                  <Grid
                     item
                     xs={12}
                     sm={12}
                     md={4}
                     lg={3}
                     className={classes.card}
                  >
                     <UserCard profile={profile} user={user} />
                  </Grid>
                  <Grid item sm={12} md={8} lg={9}>
                     <Card></Card>
                  </Grid>
               </Grid>
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

export default connect(mapStateToProps, { getProfileById })(
   withRouter(Profile)
);
