import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import LinearLoading from '../../layout/LinearLoading';
import PostListItem from '../../posts/PostListItem';
import UnderConstructionImage from '../assets/Server-bro.svg';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
   notFound: {
      position: 'relative',
      color: '#22223b',
      minHeight: 400,
      textAlign: 'center',
   },
   centered: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
   },
});

const UserPosts = ({ posts, loading }) => {
   const classes = useStyles();
   return (
      <div>
         <React.Fragment>
            {posts.length === 0 ? (
               <div className={classes.notFound}>
                  <img
                     src={UnderConstructionImage}
                     alt=""
                     style={{ width: '55%' }}
                  />
                  <Typography variant="h5" className={classes.centered}>
                     No posts to see
                  </Typography>
               </div>
            ) : (
               <div>
                  {posts.map((post) => (
                     <PostListItem
                        actions="false"
                        post={post}
                        key={post._id}
                        button={false}
                     />
                  ))}
               </div>
            )}
         </React.Fragment>
      </div>
   );
};

UserPosts.propTypes = {
   posts: PropTypes.array.isRequired,
   loading: PropTypes.bool.isRequired,
};

export default UserPosts;
