import React from 'react';
import LinearLoading from '../../layout/LinearLoading';
import PostListItem from '../../posts/PostListItem';

import PropTypes from 'prop-types';

const UserPosts = ({ posts, loading }) => {
   return (
      <React.Fragment>
         {loading ? (
            <LinearLoading />
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
   );
};

UserPosts.propTypes = {
   posts: PropTypes.array.isRequired,
   loading: PropTypes.bool.isRequired,
};

export default UserPosts;
