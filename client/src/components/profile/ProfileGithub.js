import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { makeStyles, Card, Typography, Chip, Grid } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
   },
   rowSpacing: {
      margin: theme.spacing(2),
   },
   badges: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
         margin: theme.spacing(0.5),
      },
      alignItems: 'flex-end',
   },
}));

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
   const classes = useStyles();

   useEffect(() => {
      getGithubRepos(username);
   }, [getGithubRepos, username]);
   return (
      <div>
         <Typography variant="h5">Github Repositories</Typography>
         {repos === null ? (
            <Spinner />
         ) : (
            repos.map((repo) => (
               <div key={repo.id} className={classes.root}>
                  <Card>
                     <Grid container>
                        <Grid item xs={12} sm={9}>
                           <div className={classes.rowSpacing}>
                              <Typography
                                 variant="h6"
                                 style={{ color: '#1976d2' }}
                              >
                                 <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    {repo.name}
                                 </a>
                              </Typography>
                              <Typography variant="body1">
                                 {repo.description}
                              </Typography>
                           </div>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                           <div className={classes.badges}>
                              <Chip
                                 label={`Stars: ${repo.stargazers_count}`}
                                 color="primary"
                                 variant="outlined"
                                 className={classes.chip}
                                 icon={<StarIcon />}
                              />

                              <Chip
                                 label={`Watchers: ${repo.watchers_count}`}
                                 color="primary"
                                 variant="outlined"
                                 icon={<VisibilityIcon />}
                              />

                              <Chip
                                 label={`Forks: ${repo.forks_count}`}
                                 color="primary"
                                 variant="outlined"
                                 icon={<RestaurantIcon />}
                              />
                           </div>
                        </Grid>
                     </Grid>
                  </Card>
               </div>
            ))
         )}
      </div>
   );
};

ProfileGithub.propTypes = {
   getGithubRepos: PropTypes.func.isRequired,
   repos: PropTypes.array.isRequired,
   username: PropTypes.string.isRequired,
};

const mapStateToPros = (state) => ({
   repos: state.profile.repos,
});
export default connect(mapStateToPros, { getGithubRepos })(ProfileGithub);
