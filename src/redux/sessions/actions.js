import {
  GET_SESSIONS_PENDING,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
  GET_SESSION_BY_ID_PENDING,
  GET_SESSION_BY_ID_SUCCESS,
  GET_SESSION_BY_ID_ERROR,
  CREATE_SESSION_PENDING,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,
  UPDATE_SESSION_PENDING,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_ERROR,
  DELETE_SESSION_PENDING,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_ERROR,
  CLEAN_ERROR
} from './constants';

export const getSessionsPending = () => {
  return {
    type: GET_SESSIONS_PENDING
  };
};

export const getSessionsSuccess = (data) => {
  return {
    type: GET_SESSIONS_SUCCESS,
    payload: data
  };
};

export const getSessionsError = (error) => {
  return {
    type: GET_SESSIONS_ERROR,
    payload: error
  };
};

export const getSessionByIdPending = () => {
  return {
    type: GET_SESSION_BY_ID_PENDING
  };
};

export const getSessionByIdSuccess = (data) => {
  return {
    type: GET_SESSION_BY_ID_SUCCESS,
    payload: data
  };
};

export const getSessionByIdError = (error) => {
  return {
    type: GET_SESSION_BY_ID_ERROR,
    payload: error
  };
};

export const createSessionPending = () => {
  return {
    type: CREATE_SESSION_PENDING
  };
};

export const createSessionSuccess = (data) => {
  return {
    type: CREATE_SESSION_SUCCESS,
    payload: data
  };
};

export const createSessionError = (error) => {
  return {
    type: CREATE_SESSION_ERROR,
    payload: error
  };
};

export const updateSessionPending = () => {
  return {
    type: UPDATE_SESSION_PENDING
  };
};

export const updateSessionSuccess = (data) => {
  return {
    type: UPDATE_SESSION_SUCCESS,
    payload: data
  };
};

export const updateSessionError = (error) => {
  return {
    type: UPDATE_SESSION_ERROR,
    payload: error
  };
};

export const deleteSessionPending = () => {
  return {
    type: DELETE_SESSION_PENDING
  };
};

export const deleteSessionSuccess = (id) => {
  return {
    type: DELETE_SESSION_SUCCESS,
    payload: id
  };
};

export const deleteSessionError = (error) => {
  return {
    type: DELETE_SESSION_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};
