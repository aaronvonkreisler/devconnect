import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Typography, List, makeStyles } from '@material-ui/core';
import { getPosts } from '../../actions/post';
import PostListItem from './PostListItem';

import Spinner from '../layout/Spinner';

const useStyles = makeStyles((theme) => ({
   container: {
      marginTop: '2rem',
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
         <Typography variant="h2">Posts</Typography>
         <Typography variant="h5">Welcome to the community!</Typography>
         {/* Post Form  */}
         <List>
            {posts.map((post) => (
               <PostListItem key={post._id} post={post} />
            ))}
         </List>
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
