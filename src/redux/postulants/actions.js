import {
  GET_POSTULANTS_FETCHING,
  GET_POSTULANTS_FULFILLED,
  GET_POSTULANTS_REJECTED,
  GET_POSTULANTS_BY_ID_FETCHING,
  GET_POSTULANTS_BY_ID_FULFILLED,
  GET_POSTULANTS_BY_ID_REJECTED,
  ADD_POSTULANTS_FETCHING,
  ADD_POSTULANTS_FULFILLED,
  ADD_POSTULANTS_REJECTED,
  UPDATE_POSTULANTS_FETCHING,
  UPDATE_POSTULANTS_FULFILLED,
  UPDATE_POSTULANTS_REJECTED,
  DELETE_POSTULANTS_FETCHING,
  DELETE_POSTULANTS_FULFILLED,
  DELETE_POSTULANTS_REJECTED,
  CLEAR_ERROR
} from './constants';

export const getPostulantsFetching = () => ({
  type: GET_POSTULANTS_FETCHING
});

export const getPostulantsFulfilled = (payload) => ({
  type: GET_POSTULANTS_FULFILLED,
  payload
});

export const getPostulantsRejected = (error) => ({
  type: GET_POSTULANTS_REJECTED,
  error
});

export const getPostulantsByIdFetching = () => ({
  type: GET_POSTULANTS_BY_ID_FETCHING
});

export const getPostulantsByIdFulfilled = (payload) => ({
  type: GET_POSTULANTS_BY_ID_FULFILLED,
  payload
});

export const getPostulantsByIdRejected = (error) => ({
  type: GET_POSTULANTS_BY_ID_REJECTED,
  error
});

export const addPostulantsFetching = () => ({
  type: ADD_POSTULANTS_FETCHING
});

export const addPostulantsFulfilled = (payload) => ({
  type: ADD_POSTULANTS_FULFILLED,
  payload
});

export const addPostulantsRejected = (error) => ({
  type: ADD_POSTULANTS_REJECTED,
  error
});

export const updatePostulantsFetching = () => ({
  type: UPDATE_POSTULANTS_FETCHING
});

export const updatePostulantsFulfilled = (payload) => ({
  type: UPDATE_POSTULANTS_FULFILLED,
  payload
});

export const updatePostulantsRejected = (error) => ({
  type: UPDATE_POSTULANTS_REJECTED,
  error
});

export const deletePostulantsFetching = () => ({
  type: DELETE_POSTULANTS_FETCHING
});

export const deletePostulantsFulfilled = (payload) => ({
  type: DELETE_POSTULANTS_FULFILLED,
  payload
});

export const deletePostulantsRejected = (error) => ({
  type: DELETE_POSTULANTS_REJECTED,
  error
});

export const clearError = () => ({
  type: CLEAR_ERROR
});
