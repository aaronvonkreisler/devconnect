import {
   GET_USER_POSTS,
   FETCH_USER_POSTS_ERROR,
   GET_USER_LIKED_POSTS,
} from '../actions/types';

const initialState = {
   posts: [],
   likedPosts: [],
   loading: true,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case GET_USER_POSTS:
         return {
            ...state,
            posts: payload,
            loading: false,
         };
      case GET_USER_LIKED_POSTS:
         return {
            ...state,
            likedPosts: payload,
            loading: false,
         };
      case FETCH_USER_POSTS_ERROR:
         return {
            ...state,
            error: payload,
            loading: false,
            posts: null,
         };
      default:
         return state;
   }
};
