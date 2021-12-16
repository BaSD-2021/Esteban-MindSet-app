import {
  GET_APPLICATIONS_PENDING,
  GET_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_ERROR,
  GET_APPLICATION_BY_ID_PENDING,
  GET_APPLICATION_BY_ID_SUCCESS,
  GET_APPLICATION_BY_ID_ERROR,
  CREATE_APPLICATION_PENDING,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_ERROR,
  UPDATE_APPLICATION_PENDING,
  UPDATE_APPLICATION_SUCCESS,
  UPDATE_APPLICATION_ERROR,
  DELETE_APPLICATION_PENDING,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_ERROR,
  CLEAN_ERROR,
  CLEAN_SELECTED_ITEM
} from './constants';

export const getApplicationsPending = () => {
  return {
    type: GET_APPLICATIONS_PENDING
  };
};

export const getApplicationsSuccess = (data) => {
  return {
    type: GET_APPLICATIONS_SUCCESS,
    payload: data
  };
};

export const getApplicationsError = (error) => {
  return {
    type: GET_APPLICATIONS_ERROR,
    payload: error
  };
};

export const getApplicationByIdPending = () => {
  return {
    type: GET_APPLICATION_BY_ID_PENDING
  };
};

export const getApplicationByIdSuccess = (data) => {
  return {
    type: GET_APPLICATION_BY_ID_SUCCESS,
    payload: data
  };
};

export const getApplicationByIdError = (error) => {
  return {
    type: GET_APPLICATION_BY_ID_ERROR,
    payload: error
  };
};

export const createApplicationPending = () => {
  return {
    type: CREATE_APPLICATION_PENDING
  };
};

export const createApplicationSuccess = (data) => {
  return {
    type: CREATE_APPLICATION_SUCCESS,
    payload: data
  };
};

export const createApplicationError = (error) => {
  return {
    type: CREATE_APPLICATION_ERROR,
    payload: error
  };
};

export const updateApplicationPending = () => {
  return {
    type: UPDATE_APPLICATION_PENDING
  };
};

export const updateApplicationSuccess = (data) => {
  return {
    type: UPDATE_APPLICATION_SUCCESS,
    payload: data
  };
};

export const updateApplicationError = (error) => {
  return {
    type: UPDATE_APPLICATION_ERROR,
    payload: error
  };
};

export const deleteApplicationPending = () => {
  return {
    type: DELETE_APPLICATION_PENDING
  };
};

export const deleteApplicationSuccess = (id) => {
  return {
    type: DELETE_APPLICATION_SUCCESS,
    payload: id
  };
};

export const deleteApplicationError = (error) => {
  return {
    type: DELETE_APPLICATION_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const cleanSelectedItem = () => {
  return {
    type: CLEAN_SELECTED_ITEM
  };
};
