import {
  GET_CLIENTS_PENDING,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_ERROR,
  GET_CLIENT_BY_ID_PENDING,
  GET_CLIENT_BY_ID_SUCCESS,
  GET_CLIENT_BY_ID_ERROR,
  CREATE_CLIENT_PENDING,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_ERROR,
  UPDATE_CLIENT_PENDING,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_ERROR,
  DELETE_CLIENT_PENDING,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
  CLEAN_ERROR,
  CLEAN_SELECTED_ITEM
} from './constants';

export const getClientsPending = () => {
  return {
    type: GET_CLIENTS_PENDING
  };
};

export const getClientsSuccess = (data) => {
  return {
    type: GET_CLIENTS_SUCCESS,
    payload: data
  };
};

export const getClientsError = (error) => {
  return {
    type: GET_CLIENTS_ERROR,
    payload: error
  };
};

export const getClientByIdPending = () => {
  return {
    type: GET_CLIENT_BY_ID_PENDING
  };
};

export const getClientByIdSuccess = (data) => {
  return {
    type: GET_CLIENT_BY_ID_SUCCESS,
    payload: data
  };
};

export const getClientByIdError = (error) => {
  return {
    type: GET_CLIENT_BY_ID_ERROR,
    payload: error
  };
};

export const createClientPending = () => {
  return {
    type: CREATE_CLIENT_PENDING
  };
};

export const createClientSuccess = (data) => {
  return {
    type: CREATE_CLIENT_SUCCESS,
    payload: data
  };
};

export const createClientError = (error) => {
  return {
    type: CREATE_CLIENT_ERROR,
    payload: error
  };
};

export const updateClientPending = () => {
  return {
    type: UPDATE_CLIENT_PENDING
  };
};

export const updateClientSuccess = (data) => {
  return {
    type: UPDATE_CLIENT_SUCCESS,
    payload: data
  };
};

export const updateClientError = (error) => {
  return {
    type: UPDATE_CLIENT_ERROR,
    payload: error
  };
};

export const deleteClientPending = () => {
  return {
    type: DELETE_CLIENT_PENDING
  };
};

export const deleteClientSuccess = (id) => {
  return {
    type: DELETE_CLIENT_SUCCESS,
    payload: id
  };
};

export const deleteClientError = (error) => {
  return {
    type: DELETE_CLIENT_ERROR,
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
