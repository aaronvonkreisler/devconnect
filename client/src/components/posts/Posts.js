import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Typography, makeStyles } from '@material-ui/core';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles((theme) => ({
   container: {
      marginTop: '2rem',
   },
   posts: {
      display: 'grid',
      gridTemplateColumns: '1fr 4fr',
      gridGap: '2rem',
      alignItems: 'center',
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
         <div className={classes.posts}>
            {posts.map((post) => (
               <PostItem key={post._id} post={post} />
            ))}
         </div>
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
