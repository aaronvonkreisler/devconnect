import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import PostListItem from '../../posts/PostListItem';
import UnderConstructionImage from '../assets/Under-construction.svg';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
   notFound: {
      minHeight: 400,
      textAlign: 'center',
   },
   root: {
      maxHeight: 650,
      position: 'relative',
      overflow: 'auto',
   },
});

const UserPosts = ({ posts, loading, profile: { user } }) => {
   const classes = useStyles();
   const [usersPosts, setUsersPosts] = useState([]);

   useEffect(() => {
      if (posts) {
         const userSpecificPosts = posts.filter(
            (post) => post.user === user._id
         );

         setUsersPosts(userSpecificPosts);
      }
   }, [posts, user._id]);

   return (
      <div>
         <React.Fragment>
            {usersPosts.length === 0 ? (
               <div className={classes.notFound}>
                  <img
                     src={UnderConstructionImage}
                     alt=""
                     style={{ width: '55%' }}
                  />
               </div>
            ) : (
               <div className={classes.root}>
                  {usersPosts.map((post) => (
                     <PostListItem
                        post={post}
                        key={post._id}
                        button={false}
                        showActions={true}
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
