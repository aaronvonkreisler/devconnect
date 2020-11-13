import React, { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
   Container,
   Typography,
   List,
   ListSubheader,
   makeStyles,
   Grid,
} from '@material-ui/core';
import { getPosts } from '../../actions/post';

import PostForm from './PostForm';
import PostListItem from './PostListItem';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles((theme) => ({
   container: {
      marginTop: '2rem',
   },
   list: {
      width: '100%',
      maxWidth: '80ch',
      backgroundColor: 'inherit',
   },
   header: {
      backgroundColor: 'white',
      minHeight: '2.5rem',
      color: 'black',
   },
   mt2: {
      marginTop: theme.spacing(2),
   },
}));

const Posts = ({ getPosts, post: { posts, loading } }) => {
   const classes = useStyles();

   useEffect(() => {
      getPosts();
   }, [getPosts]);

   return loading ? (
      <Spinner />
   ) : (
      <Grid container>
         <Grid item xs={12} md={9}>
            <List className={classes.list} subheader={<li />}>
               <PostForm />
               {posts.map((post) => (
                  <PostListItem key={post._id} post={post} />
               ))}
            </List>
         </Grid>
         <Grid item md={3}></Grid>
      </Grid>
   );
};

Posts.propTypes = {
   getPosts: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
