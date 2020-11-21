import {
   GET_PROFILE,
   GET_PROFILES,
   GET_USER_LIKED_POSTS,
   FETCH_USER_POSTS_ERROR,
   GET_REPOS,
   PROFILE_ERROR,
   CLEAR_PROFILE,
   UPDATE_PROFILE,
   EXPERIENCE_ERROR,
} from '../actions/types';

const initialState = {
   profile: null,
   profiles: [],
   repos: [],
   likedPosts: [],
   loading: true,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
   const { type, payload } = action;

   switch (type) {
      case GET_PROFILE:
      case UPDATE_PROFILE:
         return {
            ...state,
            profile: payload,
            loading: false,
         };
      case GET_PROFILES:
         return {
            ...state,
            profiles: payload,
            loading: false,
         };
      case PROFILE_ERROR:
         return {
            ...state,
            error: payload,
            loading: false,
            profile: null,
         };
      case EXPERIENCE_ERROR:
         return {
            ...state,
            error: payload,
         };
      case CLEAR_PROFILE:
         return {
            ...state,
            profile: null,
            repos: [],
            loading: false,
         };
      case GET_REPOS:
         return {
            ...state,
            repos: payload,
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
