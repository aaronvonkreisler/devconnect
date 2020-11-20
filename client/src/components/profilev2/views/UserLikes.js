import React from 'react';
import PropTypes from 'prop-types';
import PostListItem from '../../posts/PostListItem';
import { makeStyles } from '@material-ui/core';
import UnderConstructionImage from '../assets/Under-construction.svg';

const useStyles = makeStyles({
   notFound: {
      minHeight: 400,
      textAlign: 'center',
   },
});

const UserLikes = ({ likedPosts }) => {
   const classes = useStyles();
   return (
      <div>
         <React.Fragment>
            {likedPosts.length === 0 ? (
               <div className={classes.notFound}>
                  <img
                     src={UnderConstructionImage}
                     alt=""
                     style={{ width: '55%' }}
                  />
               </div>
            ) : (
               <div>
                  {likedPosts.map((post) => (
                     <PostListItem
                        showActions={false}
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

UserLikes.propTypes = {
   likedPosts: PropTypes.array.isRequired,
};

export default UserLikes;
