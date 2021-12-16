import {
  GET_INTERVIEWS_PENDING,
  GET_INTERVIEWS_SUCCESS,
  GET_INTERVIEWS_ERROR,
  GET_INTERVIEW_BY_ID_PENDING,
  GET_INTERVIEW_BY_ID_SUCCESS,
  GET_INTERVIEW_BY_ID_ERROR,
  CREATE_INTERVIEW_PENDING,
  CREATE_INTERVIEW_SUCCESS,
  CREATE_INTERVIEW_ERROR,
  UPDATE_INTERVIEW_PENDING,
  UPDATE_INTERVIEW_SUCCESS,
  UPDATE_INTERVIEW_ERROR,
  DELETE_INTERVIEW_PENDING,
  DELETE_INTERVIEW_SUCCESS,
  DELETE_INTERVIEW_ERROR,
  CLEAN_ERROR,
  CLEAN_SELECTED_ITEM
} from './constants';

// Actions definition
export const getInterviewsPending = () => {
  return {
    type: GET_INTERVIEWS_PENDING
  };
};

export const getInterviewsSuccess = (data) => {
  return {
    type: GET_INTERVIEWS_SUCCESS,
    payload: data
  };
};

export const getInterviewsError = (error) => {
  return {
    type: GET_INTERVIEWS_ERROR,
    payload: error
  };
};

export const getInterviewByIdPending = () => {
  return {
    type: GET_INTERVIEW_BY_ID_PENDING
  };
};

export const getInterviewByIdSuccess = (data) => {
  return {
    type: GET_INTERVIEW_BY_ID_SUCCESS,
    payload: data
  };
};

export const getInterviewByIdError = (error) => {
  return {
    type: GET_INTERVIEW_BY_ID_ERROR,
    payload: error
  };
};

export const createInterviewPending = () => {
  return {
    type: CREATE_INTERVIEW_PENDING
  };
};

export const createInterviewSuccess = (data) => {
  return {
    type: CREATE_INTERVIEW_SUCCESS,
    payload: data
  };
};

export const createInterviewError = (error) => {
  return {
    type: CREATE_INTERVIEW_ERROR,
    payload: error
  };
};

export const updateInterviewPending = () => {
  return {
    type: UPDATE_INTERVIEW_PENDING
  };
};

export const updateInterviewSuccess = (data) => {
  return {
    type: UPDATE_INTERVIEW_SUCCESS,
    payload: data
  };
};

export const updateInterviewError = (error) => {
  return {
    type: UPDATE_INTERVIEW_ERROR,
    payload: error
  };
};

export const deleteInterviewPending = () => {
  return {
    type: DELETE_INTERVIEW_PENDING
  };
};

export const deleteInterviewSuccess = (id) => {
  return {
    type: DELETE_INTERVIEW_SUCCESS,
    payload: id
  };
};

export const deleteInterviewError = (error) => {
  return {
    type: DELETE_INTERVIEW_ERROR,
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
