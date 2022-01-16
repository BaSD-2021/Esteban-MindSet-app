export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLEAN_ERROR = 'CLEAN_ERROR';
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const GET_ME_PENDING = 'GET_ME_PENDING';
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS';
export const GET_ME_ERROR = 'GET_ME_ERROR';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const setAuthentication = (user) => {
  return {
    type: SET_AUTHENTICATION,
    payload: user
  };
};

export const getMePending = () => {
  return {
    type: GET_ME_PENDING
  };
};

export const getMeSuccess = (data) => {
  return {
    type: GET_ME_SUCCESS,
    payload: data
  };
};

export const getMeError = () => {
  return {
    type: GET_ME_ERROR
  };
};
