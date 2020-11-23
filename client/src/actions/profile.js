import axios from 'axios';

import { setAlert } from './alert';
import {
   GET_PROFILE,
   GET_PROFILES,
   GET_REPOS,
   PROFILE_ERROR,
   UPDATE_PROFILE,
   CLEAR_PROFILE,
   ACCOUNT_DELETED,
   GET_USER_LIKED_POSTS,
   FETCH_USER_POSTS_ERROR,
   EXPERIENCE_ERROR,
   EDUCATION_ERROR,
} from './types';

// Get the current users profile
export const getCurrentProfile = () => async (dispatch) => {
   try {
      const res = await axios.get('/api/profile/me');

      dispatch({ type: GET_PROFILE, payload: res.data });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
   dispatch({ type: CLEAR_PROFILE });
   try {
      const res = await axios.get('/api/profile');

      dispatch({ type: GET_PROFILES, payload: res.data });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// Get profiles by id
export const getProfileById = (userId, history, authId) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      dispatch({ type: GET_PROFILE, payload: res.data });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });

      if (authId === userId) {
         history.push('/dashboard');
      } else {
         history.push('/posts');
         dispatch(
            setAlert('User has not yet set up a profile', 'toast', 'info', 5000)
         );
      }
   }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/profile/github/${username}`);

      dispatch({ type: GET_REPOS, payload: res.data });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async (
   dispatch
) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      const res = await axios.post('/api/profile', formData, config);
      dispatch({ type: GET_PROFILE, payload: res.data });

      dispatch(
         setAlert(
            edit ? 'Profile Updated' : 'Profile Created',
            'toast',
            'success'
         )
      );

      if (!edit) {
         history.push('/dashboard');
      }
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) =>
            dispatch(setAlert(error.msg, 'toast', 'error'))
         );
      }
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// Add experience
export const addExperience = (formData) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      const res = await axios.put('/api/profile/experience', formData, config);
      dispatch({ type: UPDATE_PROFILE, payload: res.data });

      dispatch(setAlert('Experience Added', 'toast', 'success'));
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) =>
            dispatch(setAlert(error.msg, 'toast', 'error'))
         );
      }
      dispatch({
         type: EXPERIENCE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// Add education
export const addEducation = (formData) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      const res = await axios.put('/api/profile/education', formData, config);
      dispatch({ type: UPDATE_PROFILE, payload: res.data });

      dispatch(setAlert('Education Added', 'toast', 'success'));
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) =>
            dispatch(setAlert(error.msg, 'toast', 'error'))
         );
      }
      dispatch({
         type: EDUCATION_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      });

      dispatch(setAlert('Experience successfully removed', 'toast', 'success'));
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      });

      dispatch(setAlert('Education successfully removed', 'toast', 'success'));
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

//Delete account and profile
export const deleteAccount = () => async (dispatch) => {
   if (window.confirm('Are you sure? This cannot be undone.')) {
      try {
         await axios.delete('/api/profile');
         dispatch({ type: CLEAR_PROFILE });
         dispatch({ type: ACCOUNT_DELETED });
         dispatch(
            setAlert(
               'Your account has been permanantly deleted',
               'toast',
               'info'
            )
         );
      } catch (err) {
         dispatch({
            type: PROFILE_ERROR,
            payload: {
               msg: err.response.statusText,
               status: err.response.status,
            },
         });
      }
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
