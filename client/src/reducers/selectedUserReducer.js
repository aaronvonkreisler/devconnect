import { GET_USER_POSTS, FETCH_USER_POSTS_ERROR } from '../actions/types';

const initialState = {
   posts: [],
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
