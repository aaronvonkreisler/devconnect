import React from 'react';
import { makeStyles } from '@material-ui/core';

import PostListItem from '../../posts/PostListItem';
import UnderConstructionImage from '../assets/Under-construction.svg';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
   notFound: {
      minHeight: 400,
      textAlign: 'center',
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
