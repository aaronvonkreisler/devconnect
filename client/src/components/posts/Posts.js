import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, makeStyles } from '@material-ui/core';
import { getPosts } from '../../actions/post';

import PostListItem from './PostListItem';
import Spinner from '../layout/Spinner';

import PostEditor from './PostEditor';

const useStyles = makeStyles((theme) => ({
   list: {
      width: '100%',
      backgroundColor: 'inherit',
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
      <div>
         <List className={classes.list} subheader={<li />}>
            <PostEditor />
            {posts.map((post) => (
               <PostListItem key={post._id} post={post} button={false} />
            ))}
         </List>
      </div>
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
