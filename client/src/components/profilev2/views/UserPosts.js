import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LinearLoading from '../../layout/LinearLoading';
import PostListItem from '../../posts/PostListItem';

import PropTypes from 'prop-types';

const UserPosts = ({ selectedUser: { posts, loading } }) => {
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

const mapStateToProps = (state) => ({
   selectedUser: state.selectedUser,
});

export default connect(mapStateToProps)(UserPosts);
