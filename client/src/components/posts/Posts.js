import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
   Container,
   Typography,
   List,
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
      <Container className={classes.container}>
         <Grid container>
            <Grid item md={3}></Grid>
            <Grid item xs={12} md={6}>
               <Typography variant="h2">Posts</Typography>
               <Typography variant="h5">Welcome to the community!</Typography>
               <List className={classes.list}>
                  <PostForm />
                  {posts.map((post) => (
                     <PostListItem key={post._id} post={post} />
                  ))}
               </List>
            </Grid>
            <Grid item md={3}></Grid>
         </Grid>
      </Container>
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
