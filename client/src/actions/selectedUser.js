import axios from 'axios';
import {
   GET_USER_POSTS,
   FETCH_USER_POSTS_ERROR,
   GET_USER_LIKED_POSTS,
} from './types';

// Get all posts for a user
export const getUsersPosts = (userId) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/posts/user/${userId}`);
      dispatch({ type: GET_USER_POSTS, payload: res.data });
   } catch (err) {
      dispatch({
         type: FETCH_USER_POSTS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const getUsersLikedPosts = (userId) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/posts/user/liked-posts/${userId}`);
      dispatch({
         type: GET_USER_LIKED_POSTS,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: FETCH_USER_POSTS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};
