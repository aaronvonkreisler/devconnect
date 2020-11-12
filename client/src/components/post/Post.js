import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, IconButton, makeStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Spinner from '../layout/Spinner';
import { getOnePost } from '../../actions/post';
import PostListItem from '../posts/PostListItem';

const useStyles = makeStyles((theme) => ({
   container: {
      marginTop: '2rem',
   },
}));

const Post = ({ getOnePost, post: { post, loading }, match }) => {
   const classes = useStyles();

   useEffect(() => {
      getOnePost(match.params.id);
   }, [getOnePost, match.params.id]);

   return loading || post === null ? (
      <Spinner />
   ) : (
      <Container className={classes.container}>
         <PostListItem post={post} showActions={false} />
      </Container>
   );
};

Post.propTypes = {
   getOnePost: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   post: state.post,
});

export default connect(mapStateToProps, { getOnePost })(Post);
