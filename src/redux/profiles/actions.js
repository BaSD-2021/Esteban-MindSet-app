import {
  GET_PROFILES_PENDING,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_ERROR,
  GET_PROFILE_BY_ID_PENDING,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_BY_ID_ERROR,
  CREATE_PROFILE_PENDING,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR,
  UPDATE_PROFILE_PENDING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  DELETE_PROFILE_PENDING,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_ERROR,
  CLEAN_ERROR
} from './constants';

export const getProfilesPending = () => {
  return {
    type: GET_PROFILES_PENDING
  };
};

export const getProfilesSuccess = (data) => {
  return {
    type: GET_PROFILES_SUCCESS,
    payload: data
  };
};

export const getProfilesError = (error) => {
  return {
    type: GET_PROFILES_ERROR,
    payload: error
  };
};

export const getProfileByIdPending = () => {
  return {
    type: GET_PROFILE_BY_ID_PENDING
  };
};

export const getProfileByIdSuccess = (data) => {
  return {
    type: GET_PROFILE_BY_ID_SUCCESS,
    payload: data
  };
};

export const getProfileByIdError = (error) => {
  return {
    type: GET_PROFILE_BY_ID_ERROR,
    payload: error
  };
};

export const createProfilePending = () => {
  return {
    type: CREATE_PROFILE_PENDING
  };
};

export const createProfileSuccess = (data) => {
  return {
    type: CREATE_PROFILE_SUCCESS,
    payload: data
  };
};

export const createProfileError = (error) => {
  return {
    type: CREATE_PROFILE_ERROR,
    payload: error
  };
};

export const updateProfilePending = () => {
  return {
    type: UPDATE_PROFILE_PENDING
  };
};

export const updateProfileSuccess = (data) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: data
  };
};

export const updateProfileError = (error) => {
  return {
    type: UPDATE_PROFILE_ERROR,
    payload: error
  };
};

export const deleteProfilePending = () => {
  return {
    type: DELETE_PROFILE_PENDING
  };
};

export const deleteProfileSuccess = (id) => {
  return {
    type: DELETE_PROFILE_SUCCESS,
    payload: id
  };
};

export const deleteProfileError = (error) => {
  return {
    type: DELETE_PROFILE_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};
