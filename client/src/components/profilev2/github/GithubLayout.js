import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import { getGithubRepos } from '../../../actions/profile';
import GithubItem from './GithubItem';

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(3),
   },
}));

const GithubLayout = ({ username, repos, getGithubRepos }) => {
   const classes = useStyles();

   useEffect(() => {
      getGithubRepos(username);
   }, [getGithubRepos, username]);

   return (
      <div>
         {repos === null ? (
            <p>'Loading' </p>
         ) : (
            <div className={classes.root}>
               <Grid container spacing={1}>
                  {repos.map((repo) => (
                     <GithubItem repo={repo} key={repo.id} />
                  ))}
               </Grid>
            </div>
         )}
      </div>
   );
};

GithubLayout.propTypes = {
   getGithubRepos: PropTypes.func.isRequired,
   repos: PropTypes.array.isRequired,
   username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
   repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(GithubLayout);
