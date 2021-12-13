import {
  GET_POSITIONS_PENDING,
  GET_POSITIONS_SUCCESS,
  GET_POSITIONS_ERROR,
  GET_POSITION_BY_ID_PENDING,
  GET_POSITION_BY_ID_SUCCESS,
  GET_POSITION_BY_ID_ERROR,
  CREATE_POSITION_PENDING,
  CREATE_POSITION_SUCCESS,
  CREATE_POSITION_ERROR,
  UPDATE_POSITION_PENDING,
  UPDATE_POSITION_SUCCESS,
  UPDATE_POSITION_ERROR,
  DELETE_POSITION_PENDING,
  DELETE_POSITION_SUCCESS,
  DELETE_POSITION_ERROR,
  CLEAN_ERROR
} from './constants';

export const getPositionsPending = () => {
  return {
    type: GET_POSITIONS_PENDING
  };
};

export const getPositionsSuccess = (data) => {
  return {
    type: GET_POSITIONS_SUCCESS,
    payload: data
  };
};

export const getPositionsError = (error) => {
  return {
    type: GET_POSITIONS_ERROR,
    payload: error
  };
};

export const getPositionByIdPending = () => {
  return {
    type: GET_POSITION_BY_ID_PENDING
  };
};

export const getPositionByIdSuccess = (data) => {
  return {
    type: GET_POSITION_BY_ID_SUCCESS,
    payload: data
  };
};

export const getPositionByIdError = (error) => {
  return {
    type: GET_POSITION_BY_ID_ERROR,
    payload: error
  };
};

export const createPositionPending = () => {
  return {
    type: CREATE_POSITION_PENDING
  };
};

export const createPositionSuccess = (data) => {
  return {
    type: CREATE_POSITION_SUCCESS,
    payload: data
  };
};

export const createPositionError = (error) => {
  return {
    type: CREATE_POSITION_ERROR,
    payload: error
  };
};

export const updatePositionPending = () => {
  return {
    type: UPDATE_POSITION_PENDING
  };
};

export const updatePositionSuccess = (data) => {
  return {
    type: UPDATE_POSITION_SUCCESS,
    payload: data
  };
};

export const updatePositionError = (error) => {
  return {
    type: UPDATE_POSITION_ERROR,
    payload: error
  };
};

export const deletePositionPending = () => {
  return {
    type: DELETE_POSITION_PENDING
  };
};

export const deletePositionSuccess = (id) => {
  return {
    type: DELETE_POSITION_SUCCESS,
    payload: id
  };
};

export const deletePositionError = (error) => {
  return {
    type: DELETE_POSITION_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};
